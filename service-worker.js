var slConfig = {
  "customerId": "tricentis-demo",
  "appName": "Testim-Calculator",
  "buildName": "69.0",
  "branchName": "Main",
  "server": "https://tricentis-demo.sealights.co/api",
  "token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL1BST0QtUE9DLmF1dGguc2VhbGlnaHRzLmlvLyIsImp3dGlkIjoiUFJPRC1QT0MsbmVlZFRvUmVtb3ZlLEFQSUdXLTZjYjczN2IyLTE2YzYtNDI2Zi05YTJhLTQwMzc0MmRlMGQ4YSwxNzIyNzgzODk0MTQ4Iiwic3ViamVjdCI6InRyaWNlbnRpcy1kZW1vQGFnZW50IiwiYXVkaWVuY2UiOlsiYWdlbnRzIl0sIngtc2wtcm9sZSI6ImFnZW50IiwieC1zbC1zZXJ2ZXIiOiJodHRwczovL3RyaWNlbnRpcy1kZW1vLnNlYWxpZ2h0cy5jby9hcGkiLCJzbF9pbXBlcl9zdWJqZWN0IjoiIiwiaWF0IjoxNzIyNzgzODk0fQ.b_N4YB0IMzxEeW21lYQS5OHmBhV7nnqkEaZArlq_biT3BHtX_yoXRULKB61f58h2n2XzBK1QmU-VkavfIAbVmyYUaaQYmZ6l0CKoEhgqonveuonfINzp9W_th9rSPxThU4AZvimrPPB8h0MQ3T2eZa2eC8eTJ4rd-TKX8wlql7ENv-rNpM3ppk8RN31K4zRjcvf9zrtOVvQwTRnusEYjcGvB_GE6uqc5XbIpUkrNssD8MF4NbQuHThvDuhZshnJjPbU9kU66z5ocx5hAXITKLe9WBjDABfm9qkmUTk9GWQOQtvBQ9jYgJZ7v7Kvf7InmgJkzvpMueSa4TJ6kNrG1n_dUGGdROSkzPqUsDN4Apte_ZXiPm4V32-RfDQ4GrjzJFeiRfX0VWr5kP33qSqMADpXQiblJu6pfCis3mlqgOtsWlcYYgFL_TGxv3Mup8pnaxCHKNYKW8NUzJwGUhPzqfghBoq46rnZhcO9o1m4DdXB9PikpWdDZjGOt8VAo2xsAS7FMWXbmZ2hlHlH20T5GAm08tBkVQMLADEpPf4QijXbQroddmvlA7Ewbbf7KJVxvyMPzDbzNpnwfm53o3jzE2laMwetUIIxN8ASvtmBFD-_wJlXNa2jeFAL01Linte5jArLuPnMRNFDCBC3n0aibtilRLfgJnPJ4eF5n3zkw6d8",
  "buildSessionId": "c38ea895-c8f6-4b18-ab27-ddbfd39b9189",
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
  "splitPreambleIntoFile": false,
  "preambleFileName": "sl-preamble-config.js",
  "preambleFileUrl": "",
  "excludeTokenFromBrowserConfig": false,
  "embedCorrectUniqueId": false
};
window.$Sealights = window.$Sealights || {};
if(window && window.$SealightsAgent){
   window.$SealightsAgent.createInstance(slConfig)
} else {
   window.$Sealights.components = window.$Sealights.components || {};
   window.$Sealights.components["c38ea895-c8f6-4b18-ab27-ddbfd39b9189"] = slConfig;   document.addEventListener("DOMContentLoaded", function(event) {
       document.body.dataset.components = JSON.stringify(window.$Sealights.components || {});
   });}
if(!window.$Sealights.scriptAdded && !window.$Sealights.skipSlAgent) {
   var script   = document.createElement("script");
   script.type  = "text/javascript";
   script.src   = "https://tricentis-demo.sealights.co/api/v1/agents/browser/recommended?redirect=1&customerId=tricentis-demo";
   var head     = document.head || document.getElementsByTagName && document.getElementsByTagName('head')[0]
   if (head) { head.appendChild(script); window.$Sealights.scriptAdded = true; } else { /* Unsupported/restricted browser */ }
}
var cov_130zzscm74=function(){var path="/home/runner/work/calculator/calculator/build/service-worker.js",hash="cef3d1c2b9cd7e2a89d8cbc2b9c57cc2f0f33b33",Function=function(){}.constructor,global=new Function('return this')(),gcv="$SealightsCoverage_c38ea895-c8f6-4b18-ab27-ddbfd39b9189",coverageData={path:"/home/runner/work/calculator/calculator/build/service-worker.js",statementMap:{"0":{start:{line:14,column:0},end:{line:14,column:89}},"1":{start:{line:16,column:0},end:{line:18,column:2}},"2":{start:{line:20,column:0},end:{line:24,column:3}},"3":{start:{line:21,column:2},end:{line:23,column:3}},"4":{start:{line:22,column:4},end:{line:22,column:23}},"5":{start:{line:26,column:0},end:{line:26,column:28}},"6":{start:{line:33,column:0},end:{line:33,column:67}},"7":{start:{line:34,column:0},end:{line:34,column:65}},"8":{start:{line:36,column:0},end:{line:39,column:3}}},fnMap:{"0":{name:"(anonymous_0)",decl:{start:{line:20,column:33},end:{line:20,column:34}},loc:{start:{line:20,column:44},end:{line:24,column:1}},line:20}},branchMap:{"0":{loc:{start:{line:21,column:2},end:{line:23,column:3}},type:"if",locations:[{start:{line:21,column:2},end:{line:23,column:3}},{start:{line:21,column:2},end:{line:23,column:3}}],line:21},"1":{loc:{start:{line:21,column:6},end:{line:21,column:54}},type:"binary-expr",locations:[{start:{line:21,column:6},end:{line:21,column:16}},{start:{line:21,column:20},end:{line:21,column:54}}],line:21},"2":{loc:{start:{line:33,column:36},end:{line:33,column:65}},type:"binary-expr",locations:[{start:{line:33,column:36},end:{line:33,column:59}},{start:{line:33,column:63},end:{line:33,column:65}}],line:33}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},f:{"0":0},b:{"0":[0,0],"1":[0,0],"2":[0,0]},_coverageSchema:"43e27e138ebf9cfc5966b082cf9a028302ed4184"},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();cov_130zzscm74.s[0]++;/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");cov_130zzscm74.s[1]++;importScripts("./precache-manifest.04ef455cf0f39d12726f0c886fb0cb1b.js");cov_130zzscm74.s[2]++;self.addEventListener('message',event=>{cov_130zzscm74.f[0]++;cov_130zzscm74.s[3]++;if((cov_130zzscm74.b[1][0]++,event.data)&&(cov_130zzscm74.b[1][1]++,event.data.type==='SKIP_WAITING')){cov_130zzscm74.b[0][0]++;cov_130zzscm74.s[4]++;self.skipWaiting();}else{cov_130zzscm74.b[0][1]++;}});cov_130zzscm74.s[5]++;workbox.core.clientsClaim();/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */cov_130zzscm74.s[6]++;self.__precacheManifest=[].concat((cov_130zzscm74.b[2][0]++,self.__precacheManifest)||(cov_130zzscm74.b[2][1]++,[]));cov_130zzscm74.s[7]++;workbox.precaching.precacheAndRoute(self.__precacheManifest,{});cov_130zzscm74.s[8]++;workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("./index.html"),{blacklist:[/^\/_/,/\/[^/?]+\.[^/]+$/]});