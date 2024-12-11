/*****************************************************
 * 
 *    CONFIG FILE - Sealights Integration
 *    
 *    Update the below parameters accordingly:
 *      grid
 *      project
 *      token
 *      branch
 * 
 *****************************************************/

checkifModuleExists('sync-request');
checkifModuleExists('fs');

//need to install the following node modules
const request = require('sync-request');
const fs = require('fs');

let sl_agent_token = '';
let baseUrl = 'https://tricentis-demo.sealights.co/sl-api';
let labId = ''; 
let bsid = ''; 
let stageName = 'Regression';
let testSessionId = null;

const testResults = []; // To collect test results during the test execution
const statusMap = {
  PASSED: 'passed',
  FAILED: 'failed',
  'FAILED-EVALUATING': 'failed',
  ABORTED: 'skipped',
  SKIPPED: 'skipped',
  default: 'failed'
};

// Initialize SL vars before running tests
init();

exports.config = {
    grid:       "Testim-Grid",
    project:    "8iuIg6jOYNgj5YnNs5RJ",
    token:      "HFPMMWmDBgphmMFNcfS4oxVts7JPyZChVl1rYgGXBPs5pkKT8C",
    branch:     "master",

	beforeSuite(suite) {
		if (!testSessionId) {
			try {
				testSessionId = createTestSession();
				console.log(`[Sealights] Test session opened, testSessionId: ${testSessionId}`);
			} catch (err) {
				console.error(`[Sealights] Failed to open Test Session: ${err.message}`);
			}
		}
	},

    afterTest(test) {
        const endTime = test.startTime + test.duration;
		//console.log(`[Sealights] After Test: ${test.name} - ${test.status}`);
        testResults.push({
            name: test.name,
            status: statusMap[test.status] || statusMap.default, // Map test status inline
            start: getEpochTimestamp(test.startTime),
            end: getEpochTimestamp(endTime)
        });
    },

    afterSuite(suite) {
		if (testSessionId) {
			try {
				// Both of these functions are now synchronous
				sendTestResults(testResults);
				endTestSession(testSessionId);
			} catch (err) {
				console.error(`[Sealights] Error: ${err.message}`);
			} finally {
				testSessionId = null; // Reset session ID
				testResults.length = 0; // Clear collected results
			}
		}
	}
};

// Function to create a test session
function createTestSession() {
    const apiUrl = `${global.baseUrl}/v1/test-sessions`;
    const requestBody = {
        labId: global.labId,
        testStage: global.stageName,
        bsid: global.bsid
    };
    const headers = getHeader();
	
    // Use the sync-request library to make a synchronous HTTP call
    const res = request('POST', apiUrl, {
        json: requestBody,
        headers: headers
    });
	
    if (res.statusCode >= 200 && res.statusCode < 300) {
        const data = JSON.parse(res.getBody('utf8'));
        return data.data.testSessionId;
    } else {
        throw new Error(`Error ${res.statusCode}: ${res.statusMessage}`);
    }
}

function sendTestResults(results) {
    if (!results || results.length === 0) return;

    const apiUrl = `${global.baseUrl}/v2/test-sessions/${testSessionId}`;
    const headers = getHeader();

	// Attempt to serialize results to JSON for logging and validation
    let resultsJson;
    try {
        resultsJson = JSON.stringify(results, null, 2);
    } catch (error) {
        console.error("[Sealights] Failed to serialize results to JSON:", error.message);
        return; // If serialization fails, do not send the request
    }

    try {
        // Make the synchronous request using the raw JSON string
        const res = request('POST', apiUrl, {
            body: resultsJson,
            headers: headers
        });

        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`[Sealights] ${results.length} Test results sent successfully.`);
        } else {
            console.error(`[Sealights] Failed to send test results. Status: ${res.statusCode}, Body: ${res.getBody('utf8')}`);
        }
    } catch (error) {
        console.error(`[Sealights] Error sending test results: ${error.message}`);
        console.error(`[Sealights] Failed to send test results. Status: ${res.statusCode}, Body: ${res.getBody('utf8')}`);
    }
}

// Function to end a test session (synchronous)
function endTestSession(sessionId) {
    const apiUrl = `${global.baseUrl}/v1/test-sessions/${sessionId}`;
    const headers = getHeader();

    try {
        const res = request('DELETE', apiUrl, {
            headers: headers
        });

        if (res.statusCode === 200 || res.statusCode === 204) {
            console.log('[Sealights] Test session deleted successfully');
        } else {
            const body = res.getBody('utf8');
            throw new Error(`Error ${res.statusCode}: ${body}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// *** HELPER FUNCTIONS ***

// Initialization function to set baseUrl, labId, bsid, and stageName
function init() {
    console.log(`[Sealights] This solution demonstrates the integration of Testim and Sealights as a proof of concept and is subject to change without prior notice. Maintenance in its current form is not guaranteed.`);
    try {
        // Check for the settings file from the environment variable
        const settingsFilePath = process.env.SEALIGHTS_SETTINGS_FILE || '';

        let providedToken = process.env.SEALIGHTS_AGENT_TOKEN || '';
        let providedLabId = '';
        let providedBsid = '';
        let providedStageName = 'Regression'; // Default stage name

        /******* get buildSessionId *******/
        let data = fs.readFileSync("./buildSessionId", 'utf8');
        providedBsid = data.trim();
        console.log("\n>>>>>>>>>>>>>>>>>>> providedBsid: " + providedBsid + "\n");

        /******* get Sealights agent token *******/
        let data2 = fs.readFileSync("./sltoken.txt", 'utf8');
        providedToken = data2.trim();
        console.log("\n>>>>>>>>>>>>>>>>>>> providedToken: " + providedToken + "\n");

        // If a settings file is provided, load it and extract fields
        /*if (settingsFilePath) {
            const settings = require(settingsFilePath);

            // If no token from ENV, try from JSON file
            if (!providedToken && settings.token) {
                providedToken = settings.token;
            }

            providedLabId = settings.labId || '';
            providedStageName = settings.testStageName || 'Testim Tests';
            providedBsid = settings.bsid || '';
        }*/

        

        // Validate mandatory fields
        if (!providedToken) {
            throw new Error('[Sealights] Token is required. Please set the SEALIGHTS_AGENT_TOKEN environment variable or define token in the settings JSON file.');
        }

        if (!providedBsid && !providedLabId) {
            throw new Error('[Sealights] Either bsid or labId must be provided in the settings JSON.');
        }

        // Decode the token's payload (JWT)
        const payload = JSON.parse(Buffer.from(providedToken.split('.')[1], 'base64').toString('utf8'));
        const apiBaseUrl = payload['x-sl-server'];

        if (!apiBaseUrl) {
            throw new Error('[Sealights] Token is invalid.');
        }

        // Initialize global variables
        global.sl_agent_token = providedToken;
        global.baseUrl = 'https://tricentis-demo.sealights.co/sl-api'
        global.bsid = providedBsid;
        global.stageName = providedStageName;
        global.labId = providedLabId || providedBsid;

        console.log(`[Sealights] Base URL initialized: ${global.baseUrl}`);
        console.log(`[Sealights] BSID: ${global.bsid}, LabId: ${global.labId}, StageName: ${global.stageName}`);
    } catch (err) {
        console.error(`[Sealights] Initialization failed: ${err.message}`);
        throw err; // Re-throw to stop execution if needed
    }
}


// Helper function to build headers
function getHeader() {
    return {
        Authorization: `Bearer ${global.sl_agent_token}`,
        'Content-Type': 'application/json'
    };
}

// Helper function to convert date to epoch timestamp
function getEpochTimestamp(value) {
    const dtValue = new Date(value);
    return dtValue.getTime();
}

function checkifModuleExists(module) {
    const { exec } = require('child_process');
    // define the module name to check and install
    const moduleName = module;
    // check if the module is installed
    exec(`npm list ${moduleName}`, (err, stdout, stderr) => {
        if (err) {
            // the module is not installed, so install it
            console.log(`Installing ${moduleName}...`);
            exec(`npm install ${moduleName}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error installing ${moduleName}: ${err}`);
            } else {
                console.log(`${moduleName} installed successfully`);
            }
            });
        } else {
            // the module is already installed
            //console.log(`${moduleName} is already installed`);
        }
    });
}