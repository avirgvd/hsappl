/**
 * Created by govind on 9/15/18.
 */


import history from '../RouteHistory';

import {getRESTApi, postRESTApi} from '../Api';
require('es6-promise').polyfill();

export const DOCUMENTS_NAV = 'DOCUMENTS_NAV';
export const DOCUMENTS_LOAD_NEXT_SUCCESS = 'DOCUMENTS_LOAD_NEXT_SUCCESS';
export const DOCUMENTS_LOAD_SUCCESS = 'DOCUMENTS_LOAD_SUCCESS';
export const DOCUMENTS_LOAD = 'DOCUMENTS_LOAD';
export const DOCUMENTS_UNLOAD = 'DOCUMENTS_UNLOAD';

// Action creators

export function documentsLoad(category, query) {
  console.log("documentsLoad category", category);
  console.log("documentsLoad data", query);

  return dispatch => {

    let uri = '/rest/documents/items';
    let reqBody = {
      url: '/rest/documents',
      category: category,
      params: {
        from: 0,
        size: 10,
      },
      query: query
    };

    console.log("uri: ", uri);
    console.log("reqBody: ", reqBody);

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("documentsLoad: ", response);
        return response.json()
      }).then(function(result) {
      console.log('documentsLoad: parsed json', result);
      dispatch(documentsLoadSuccess(category, result));
    }).catch(function(ex) {
      console.log('documentsLoad: parsing failed', ex);
    });

  };
}


export function documentsNextMore(category, index, query) {

  console.log("documentsNextMore action query: ", query);

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/index/items';
    let uri = '/rest/documents/items';

    var from = index.getIn(['result', 'currentEnd']);
    console.log("documentsNextMore from: ", from);

    let reqBody = {
      url: '/rest/' + category,
      category: category,
      params: {
        from: from,
        size: 10,
      },
      query: query
    };

    console.log("documentsNextMore: reqbody: ", JSON.stringify(reqBody));


    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("documentsNextMore: ", response);
        return response.json()
      }).then(function(json) {
      console.log('documentsNextMore parsed json', json);
      dispatch(documentsLoadNextSuccess(category, json));
    }).catch(function(ex) {
      console.log('documentsNextMore parsing failed', ex);
    });

  };
}

export function documentAdd(category, item) {

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/add/';
    let uri = '/rest/document/add/';
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
      dispatch(DOCUMENTS_LOAD_SUCCESS(category, json));
    }).catch(function(ex) {
      console.log('documentAdd parsing failed', ex);
    });

  };
}

export function documentsUnLoad(category, index) {

  console.log("documentsUnLoad");

  return {
    type: DOCUMENTS_UNLOAD,
    category: category,
  };
}

export function documentsLoadSuccess(category, items) {

  console.log("documentsLoadSuccess: category: ", category);
  console.log("################ documentsLoadSuccess: items: ", items);

  if(items) {
    return {
      type: DOCUMENTS_LOAD_SUCCESS,
      category: category,
      hosturl: items.hosturl,
      result: items.result
    };
  }

}

export function documentsLoadNextSuccess(category, json) {


  return {
    type: DOCUMENTS_LOAD_NEXT_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

// TODO: The below code needs some improvements
export function documentsNav (directory, category, datajson, queryjson) {
  console.log("documentsactions: documentsNav directory:", directory);
  console.log("documentsactions: documentsNav category:", category);
  console.log("documentsactions: documentsNav datajson:", datajson);
  console.log("documentsactions: documentsNav queryjson:", queryjson);

  // TODO: Warning: [history] pushState is deprecated; use push instead 4/21/2018
  history.pushState(null, (directory || `/${category}`));
  return {
    type: DOCUMENTS_NAV,
    category: category,
    data: datajson,
    query: queryjson
  };

}

