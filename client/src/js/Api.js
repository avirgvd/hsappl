/**
 * Created by govind on 12/24/16.
 */

/** Wrapper for REST API calls to Node,JS server */

import fetch from 'isomorphic-fetch';


let _hostname = window.location.host.replace('3010', '3000')
let _storagehost = window.location.host.replace('3010', '3040')

export function getRESTApi(url, request) {

  console.log('URL: ', 'http://' + _hostname + url);

  return fetch('http://' + _hostname + url, request);
}

export function postRESTApi(url, reqBody) {

  console.log("postRESTApi: url:", url);

  let restRequest = {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log('URL: ', 'http://' + _hostname + url);

  // return fetch('http://' + _hostname + url, restRequest);
  return fetch('http://' + _hostname + url, restRequest);

}

export function filesServerBaseURL(bucket) {
  // The file server is HSStorageManager which is listening on 3040
  // return 'http://' + _hostname.replace('3000', '3040') + '/rest/';
  if(bucket != undefined)
    return 'http://' + _storagehost + '/rest/file/' + bucket + '/';
  else
    return 'http://' + _storagehost + '/rest/file/';
}

