var slConfig = {
  "customerId": "tricentis-demo",
  "appName": "Testim-Calculator",
  "buildName": "8.0",
  "branchName": "Main",
  "server": "https://tricentis-demo.sealights.co/api",
  "token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL1BST0QtUE9DLmF1dGguc2VhbGlnaHRzLmlvLyIsImp3dGlkIjoiUFJPRC1QT0MsbmVlZFRvUmVtb3ZlLEFQSUdXLTZjYjczN2IyLTE2YzYtNDI2Zi05YTJhLTQwMzc0MmRlMGQ4YSwxNzIyNzgzODk0MTQ4Iiwic3ViamVjdCI6InRyaWNlbnRpcy1kZW1vQGFnZW50IiwiYXVkaWVuY2UiOlsiYWdlbnRzIl0sIngtc2wtcm9sZSI6ImFnZW50IiwieC1zbC1zZXJ2ZXIiOiJodHRwczovL3RyaWNlbnRpcy1kZW1vLnNlYWxpZ2h0cy5jby9hcGkiLCJzbF9pbXBlcl9zdWJqZWN0IjoiIiwiaWF0IjoxNzIyNzgzODk0fQ.b_N4YB0IMzxEeW21lYQS5OHmBhV7nnqkEaZArlq_biT3BHtX_yoXRULKB61f58h2n2XzBK1QmU-VkavfIAbVmyYUaaQYmZ6l0CKoEhgqonveuonfINzp9W_th9rSPxThU4AZvimrPPB8h0MQ3T2eZa2eC8eTJ4rd-TKX8wlql7ENv-rNpM3ppk8RN31K4zRjcvf9zrtOVvQwTRnusEYjcGvB_GE6uqc5XbIpUkrNssD8MF4NbQuHThvDuhZshnJjPbU9kU66z5ocx5hAXITKLe9WBjDABfm9qkmUTk9GWQOQtvBQ9jYgJZ7v7Kvf7InmgJkzvpMueSa4TJ6kNrG1n_dUGGdROSkzPqUsDN4Apte_ZXiPm4V32-RfDQ4GrjzJFeiRfX0VWr5kP33qSqMADpXQiblJu6pfCis3mlqgOtsWlcYYgFL_TGxv3Mup8pnaxCHKNYKW8NUzJwGUhPzqfghBoq46rnZhcO9o1m4DdXB9PikpWdDZjGOt8VAo2xsAS7FMWXbmZ2hlHlH20T5GAm08tBkVQMLADEpPf4QijXbQroddmvlA7Ewbbf7KJVxvyMPzDbzNpnwfm53o3jzE2laMwetUIIxN8ASvtmBFD-_wJlXNa2jeFAL01Linte5jArLuPnMRNFDCBC3n0aibtilRLfgJnPJ4eF5n3zkw6d8",
  "buildSessionId": "faa91c09-b668-40e4-885e-42e0ecf4124f",
  "enabled": true,
  "workspacepath": "/home/runner/work/calculator/calculator/build/",
  "maxItemsInQueue": 500,
  "registerShutdownHook": true,
  "interval": 10,
  "resolveWithoutHash": true,
  "delayShutdownInSeconds": 30,
  "isUseNewUniqueId": false,
  "footprintsEnableV6": true,
  "footprintsBufferThresholdMb": 10,
  "footprintsCollectIntervalSecs": 10,
  "footprintsSendIntervalSecs": 10,
  "executionQueryIntervalSecs": 10,
  "footprintsQueueSize": 2,
  "blockBrowserHttpTraffic": false,
  "enableOpenTelemetry": false,
  "footprintsMapping": "agent",
  "removeSensitiveData": false,
  "experimentalSizeReduction": false,
  "excludeTokenFromBrowserConfig": false
};
window.$Sealights = window.$Sealights || {};
if(window && window.$SealightsAgent){
   window.$SealightsAgent.createInstance(slConfig)
} else {
   window.$Sealights.components = window.$Sealights.components || {};
   window.$Sealights.components["faa91c09-b668-40e4-885e-42e0ecf4124f"] = slConfig;   document.addEventListener("DOMContentLoaded", function(event) {
       document.body.dataset.components = JSON.stringify(window.$Sealights.components || {});
   });}
if(!window.$Sealights.scriptAdded && !window.$Sealights.skipSlAgent) {
   var script   = document.createElement("script");
   script.type  = "text/javascript";
   script.src   = "https://tricentis-demo.sealights.co/api/v1/agents/browser/recommended?redirect=1&customerId=tricentis-demo";
   var head     = document.head || document.getElementsByTagName && document.getElementsByTagName('head')[0]
   if (head) { head.appendChild(script); window.$Sealights.scriptAdded = true; } else { /* Unsupported/restricted browser */ }
}
var cov_19x6qog4ps=function(){var path="/home/runner/work/calculator/calculator/build/precache-manifest.41cf6abefd31192bc96b02c77048f9fc.js",hash="076f87a761eacac1c90ebae8db98db28d965f98a",Function=function(){}.constructor,global=new Function('return this')(),gcv="$SealightsCoverage_faa91c09-b668-40e4-885e-42e0ecf4124f",coverageData={path:"/home/runner/work/calculator/calculator/build/precache-manifest.41cf6abefd31192bc96b02c77048f9fc.js",statementMap:{"0":{start:{line:1,column:0},end:{line:26,column:3}}},fnMap:{},branchMap:{"0":{loc:{start:{line:1,column:27},end:{line:1,column:56}},type:"binary-expr",locations:[{start:{line:1,column:27},end:{line:1,column:50}},{start:{line:1,column:54},end:{line:1,column:56}}],line:1}},s:{"0":0},f:{},b:{"0":[0,0]},_coverageSchema:"43e27e138ebf9cfc5966b082cf9a028302ed4184"},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();cov_19x6qog4ps.s[0]++;self.__precacheManifest=((cov_19x6qog4ps.b[0][0]++,self.__precacheManifest)||(cov_19x6qog4ps.b[0][1]++,[])).concat([{"revision":"118b56d8fdeacd5d439898f45240a043","url":"/calculator/index.html"},{"revision":"9b92d034df4db429be6e","url":"/calculator/static/css/main.09ee2f94.chunk.css"},{"revision":"28d6df99349546cf2cf0","url":"/calculator/static/js/2.c045c614.chunk.js"},{"revision":"570d362d673dab785e62d2b8563e1118","url":"/calculator/static/js/2.c045c614.chunk.js.LICENSE.txt"},{"revision":"9b92d034df4db429be6e","url":"/calculator/static/js/main.0248e709.chunk.js"},{"revision":"e765e492bb7ea77de3f8","url":"/calculator/static/js/runtime-main.0945a1b5.js"}]);