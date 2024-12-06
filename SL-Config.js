/*****************************************************
 * 
 *    CONFIG FILE - Sealights Integration
 *    
 *    Update the below parameters accordingly:
 *      sl_agent_token
 *      testStage
 *      bsid
 *      grid
 *      project
 *      token
 *      branch
 *      
 * 
 *****************************************************/

checkifModuleExists('axios');
checkifModuleExists('fs');

//need to install the following node modules
const axios = require('axios');
const fs = require('fs');

const testStage = 'E2E Tests';

let bsid = "";
let sl_agent_token = "";

// Array of test results
const _TESTS = [];

let _SESSIONID = "";

exports.config = {
    grid:       "Testim-Grid",
    project:    "8iuIg6jOYNgj5YnNs5RJ",
    token:      "HFPMMWmDBgphmMFNcfS4oxVts7JPyZChVl1rYgGXBPs5pkKT8C",
    branch:     "master",

    async beforeSuite () {

        /******* get buildSessionId *******/
        let data = fs.readFileSync("./buildSessionId", 'utf8');
        bsid = data.trim();
        console.log("\n>>>>>>>>>>>>>>>>>>> bsid: " + bsid + "\n");

        /******* get Sealights agent token *******/
        let data2 = fs.readFileSync("./sltoken.txt", 'utf8');
        sl_agent_token = data2.trim();
        console.log("\n>>>>>>>>>>>>>>>>>>> sl_agent_token: " + sl_agent_token + "\n");

        try{
            createTestSession();
        } catch(err) {
            console.error(`[Sealights] Failed to open Test Session: ${err.message}`);
        }
    },

    afterTest (test) {
        addResult(_TESTS, test.name, test.status, test.startTime, test.duration);
    },

    async afterSuite () {
        
        try {
            await sendTestResults();
            console.log('\n[Sealights] Sending test results completed');
            
            await deleteSession();
            console.log('\n[Sealights] Session deletion completed');
        } catch (err) {
            console.error(`\n[Sealights] Error: ${err.message}`);
            throw err; // Re-throw to ensure test framework knows about the error
        }
    }

}


/*****************************
   create test session in SL 
*****************************/
async function createTestSession(){

        const apiUrl = 'https://tricentis-demo.sealights.co/sl-api/v1/test-sessions';
        const headers = {
            'Authorization': 'Bearer ' + sl_agent_token,
            'Content-Type': 'application/json'
        };

        const requestBody = {
            testStage: testStage,
            bsid: bsid
        };

        axios.post(apiUrl, requestBody, { headers })
        .then(response => {
            const testSessionId = response.data.data.testSessionId;
            _SESSIONID = testSessionId;
            console.log('\n[Sealights] Session [' + _SESSIONID + '] created successfully');

        })
        .catch(error => {
            console.error('Error: ', error.response ? error.response.data : error.message);
        });
}


/*********************************
  report test event result to SL
*********************************/
async function sendTestResults() {

    console.log(_TESTS);
    
    const apiUrl = 'https://tricentis-demo.sealights.co/sl-api/v2/test-sessions/' + _SESSIONID;
    const headers = {
        'Authorization': 'Bearer ' + sl_agent_token,
        'Content-Type': 'application/json'
    };
    const requestBody = _TESTS;

    try {
        await axios.post(apiUrl, requestBody, { headers });
        console.log('\n[Sealights] Test results for session [' +_SESSIONID +  '] have been sent successfully');
    } catch (error) {
        console.error(`[Sealights] Error sending test results: ${error.message}`);
    }
}


// Add test result to the array
function addResult(store, name, status, startTime, duration) {
    const _endTime = startTime + duration;
    //store.push({ name: name, start: getEpochTimestamp(startTime), end: getEpochTimestamp(_endTime), status: status.toLowerCase() });
    store.push({ name: name, start: startTime, end: _endTime, status: status.toLowerCase() });

}


// Convert date to epoch timestamp
function getEpochTimestamp(value) {
    const dtValue = new Date(value);
    return dtValue.getTime();
}


/*********************************
       delete session in SL
*********************************/
async function deleteSession() {
    
    const apiUrl = 'https://tricentis-demo.sealights.co/sl-api/v1/test-sessions/' + _SESSIONID;

    const config = {
        headers: {
            'Authorization': 'Bearer ' + sl_agent_token,
            'Content-Type': 'application/json'
        }
    };

    try {
        console.log('\n[Sealights] Starting session deletion');
        await axios.delete(apiUrl, config);
        console.log('\n[Sealights] Test session [' + _SESSIONID + '] deleted successfully');
    } catch (error) {
        console.error('\n[Sealights] Error deleting test session:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
            status: error.response ? error.response.status : 'Unknown'
        });
        throw new Error(error.response ? error.response.data : error.message);
    }
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
            console.log(`${moduleName} is already installed`);
        }
    });
}



