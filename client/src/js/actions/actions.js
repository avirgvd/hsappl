/**
 * Created by govind on 7/26/16.
 */
// import fetch from 'isomorphic-fetch';

import {getRESTApi, postRESTApi} from '../Api';

require('es6-promise').polyfill();

export const IMPORT_LOCAL_FILES='IMPORT_LOCAL_FILES';
export const IMPORT_SUCCESS='IMPORT_SUCCESS';

export function importLocalFiles(path, context) {
  console.log("importLocalFiles: path:", path);

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/import/';
    let uri = '/rest/import/';
    let reqBody = {
      path: path,
      context: context
    };
    
    // let restRequest = {
    //   method: "POST",
    //   body: JSON.stringify(reqBody),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("importLocalFiles fetch: ", response);
        return response.json()
      }).then(function(json) {
      console.log('importLocalFiles fetch parsed json', json);
      dispatch(importSuccess(category, json));
    }).catch(function(ex) {
      console.log('importLocalFiles fetch parsing failed', ex);
    });

  };
}

export function importSuccess() {
  return dispatch => {

  };
}
