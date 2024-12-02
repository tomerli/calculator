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

const testStage = 'Regression';

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


        /*****************************
           create test session in SL 
        *****************************/
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
            console.log('\n>>>>>>>>>>>>>>>>>>> beforeSuite() :: _SESSIONID: ', _SESSIONID + "\n");

        })
        .catch(error => {
            console.error('Error: ', error.response ? error.response.data : error.message);
        });
    },

    afterTest (test) {
        addResult(_TESTS, test.name, test.status, test.startTime, test.duration);
    },

    async afterSuite () {
        console.log(_TESTS);

        /*********************************
          report test event result to SL
        *********************************/
        const apiUrl = 'https://tricentis-demo.sealights.co/sl-api/v2/test-sessions/' + _SESSIONID;
        const headers = {
            'Authorization': 'Bearer ' + sl_agent_token,
            'Content-Type': 'application/json'
        };

        const requestBody = _TESTS;

        axios.post(apiUrl, requestBody, { headers });

        /***************************
           end test session in SL
        ***************************/
        deleteSession(_SESSIONID)
        .then(data => console.log('Delete successful: ', data))
        .catch(err => console.error(err));
    }

}


// Add test result to the array
function addResult(store, name, status, startTime, duration) {
    const _endTime = startTime + duration;
    store.push({ name: name, start: startTime, end: _endTime, status: status.toLowerCase() });

}


const deleteSession = async (id) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + sl_agent_token,
            'Content-Type': 'application/json'
        }
    };

    try {
        console.log('\n>>>>>>>>>>>>>>>>>>> deleteSession() :: _SESSIONID: ', id + "\n");
        const response = await axios.delete(`https://tricentis-demo.sealights.co/sl-api/v1/test-sessions/${id}`, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server error:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};


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



