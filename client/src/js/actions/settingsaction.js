/**
 * Created by govind on 12/2/18.
 */


import history from '../RouteHistory';

import {getRESTApi, postRESTApi} from '../Api';
require('es6-promise').polyfill();

export const SETTINGS_NAV = 'SETTINGS_NAV';
export const SETTINGS_LOAD_NEXT_SUCCESS = 'SETTINGS_LOAD_NEXT_SUCCESS';
export const SETTINGS_LOAD_SUCCESS = 'SETTINGS_LOAD_SUCCESS';
export const SETTINGS_LOAD = 'SETTINGS_LOAD';
export const SETTINGS_UNLOAD = 'SETTINGS_UNLOAD';

// Action creators

export function settingsLoad(category, query) {
  console.log("settingsLoad category", category);
  console.log("settingsLoad data", query);

  return dispatch => {

    let uri = '/rest/settings';
    let reqBody = {
      url: '/rest/settings',
      category: category,
      query: query
    };

    console.log("uri: ", uri);
    console.log("reqBody: ", reqBody);

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("settingsLoad: ", response);
        return response.json()
      }).then(function(result) {
      console.log('settingsLoad: parsed json', result);
      dispatch(documentsLoadSuccess(category, result));
    }).catch(function(ex) {
      console.log('settingsLoad: parsing failed', ex);
    });

  };
}



export function settingsUpdate(category, updatedsettings) {

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/add/';
    let uri = '/rest/document/update/';
    // let uri = 'http://localhost:3000/rest/add/';
    let reqBody = {
      url: '/rest/' + category,
      category: category,
      item: item
    };

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("documentAdd: ", response);
        return response.json()
      }).then(function(json) {
      console.log('documentAdd parsed json', json);
      dispatch(SETTINGS_LOAD_SUCCESS(category, json));
    }).catch(function(ex) {
      console.log('documentAdd parsing failed', ex);
    });

  };
}

export function settingsUnLoad(category, index) {

  console.log("settingsUnLoad");

  return {
    type: SETTINGS_UNLOAD,
    category: category,
  };
}

export function settingsLoadSuccess(category, items) {

  console.log("settingsLoadSuccess: category: ", category);
  console.log("################ documentsLoadSuccess: items: ", items);

  if(items) {
    return {
      type: SETTINGS_LOAD_SUCCESS,
      category: category,
      hosturl: items.hosturl,
      result: items.result
    };
  }

}

// TODO: The below code needs some improvements
export function settingsNav (directory, category, datajson, queryjson) {
  console.log("settingsNav directory:", directory);
  console.log("settingsNav category:", category);
  console.log("settingsNav datajson:", datajson);
  console.log("settingsNav queryjson:", queryjson);

  // TODO: Warning: [history] pushState is deprecated; use push instead 4/21/2018
  history.pushState(null, (directory || `/${category}`));
  return {
    type: SETTINGS_NAV,
    category: category,
    data: datajson,
    query: queryjson
  };

}

