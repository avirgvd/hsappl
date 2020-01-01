/**
 * Created by govind on 12/25/19.
 */


import history from '../RouteHistory';

import {getRESTApi, postRESTApi} from '../Api';

require('es6-promise').polyfill();


// accounts page
export const ACCOUNTS_NAV = 'ACCOUNTS_NAV';
export const ACCOUNTS_SCROLL = 'ACCOUNTS_SCROLL';
export const ACCOUNTS_PREV_MORE = 'ACCOUNTS_PREV_MORE';
export const ACCOUNTS_NEXT_MORE = 'ACCOUNTS_NEXT_MORE';

export const ACCOUNTS_LOAD = 'ACCOUNTS_LOAD';
export const ACCOUNTS_UNLOAD = 'ACCOUNTS_UNLOAD';

export const ACCOUNTS_SELECT = 'ACCOUNTS_SELECT';
export const ACCOUNTS_QUERY = 'ACCOUNTS_QUERY';
export const ACCOUNTS_ADD = 'ACCOUNTS_ADD';

// accounts api
export const ACCOUNTS_SUCCESS = 'ACCOUNTS_SUCCESS';
// export const ACCOUNTS_SUCCESS_FILTERS = 'ACCOUNTS_SUCCESS_FILTERS';
export const ACCOUNTS_PREV_SUCCESS = 'ACCOUNTS_PREV_SUCCESS';
export const ACCOUNTS_NEXT_SUCCESS = 'ACCOUNTS_NEXT_SUCCESS';

export const ACCOUNTS_FAILURE = 'ACCOUNTS_FAILURE';
export const ACCOUNTS_REQUEST = 'ACCOUNTS_REQUEST';

export const ACCOUNTS_WATCHER_UPDATE = 'ACCOUNTS_WATCHER_UPDATE';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

// Action creators

export function accountsLoad(query) {
  console.log("accountsLoad data", query);

  var uri = '/rest/accounts/list';

  return dispatch => {

    let reqBody = {
      url: '/rest/accounts/list',
      params: {
        from: 0,
        size: 10,
      },
      query: query
    };

    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("accountsLoad: ", response);
        return response.json()
      }).then(function(result) {
      console.log('accountsLoad: parsed json', result);
      dispatch(accountsSuccess(result));
    }).catch(function(ex) {
      console.log('accountsLoad: parsing failed', ex);
    });

  };
}

export function accountsNextMore(accounts, query) {

  console.log("accountsNextMore action query: ", query);

  return dispatch => {

    let uri = '/rest/accounts/items';

    var from = accounts.getIn(['result', 'currentEnd']);
    console.log("accountsNextMore from: ", from);

    let reqBody = {
      params: {
        from: from,
        size: 10,
      },
      query: query
    };

    console.log("accountsNextMore: reqbody: ", JSON.stringify(reqBody));

    // let restRequest = {
    //                     method: "POST",
    //                     body: JSON.stringify(reqBody),
    //                     headers: {
    //                       "Content-Type": "application/json"
    //                     }
    //                   };

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("accountsLoad: ", response);
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json);
      dispatch(accountsNextSuccess(json));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });

  };
}

export function accountsAdd(item) {

  return dispatch => {

    let uri = '/rest/add/';
    let reqBody = {
      item: item
    };

    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("accountsAdd: ", response);
        return response.json()
      }).then(function(json) {
      console.log('accountsAdd parsed json', json);
      dispatch(accountsSuccess(json));
    }).catch(function(ex) {
      console.log('accountsAdd parsing failed', ex);
    });

  };
}

export function accountsUnLoad(accounts) {

  console.log("accountsUnLoad");

  return {
    type: ACCOUNTS_UNLOAD,
  };
}

export function accountsSuccess(response) {

  console.log("################ accountsSuccess: response: ", response);

  if(response) {
    return {
      type: ACCOUNTS_SUCCESS,
      result: response.result
    };
  }

}

export function accountsNextSuccess(json) {


  return {
    type: ACCOUNTS_NEXT_SUCCESS,
    hosturl: json.hosturl,
    result: json.result
  };
}

export function accountsNav (path, category, datajson={}, queryjson={}) {
  console.log("accountsactions: accountsNav path:", path);
  console.log("accountsactions: accountsNav datajson:", datajson);
  console.log("accountsactions: accountsNav queryjson:", queryjson);

  // TODO: Warning: [history] pushState is deprecated; use push instead 4/21/2018
  history.pushState(null, (path || `/${category}`));
  return {
    type: ACCOUNTS_NAV,
    data: datajson,
    query: queryjson
  };



}

// TODO: Write some comments on this accounts action 4/21/2018
export function globalFetch(category, query) {
  console.log("accountsactions: fetch catgegory:", category);
  console.log("accountsactions: fetch query:", query);

  return dispatch => {

    let uri = '/rest/fetch/';
    // let uri = 'http://192.168.1.147:3000/rest/fetch/';
    // let uri = 'http://localhost:3000/rest/fetch/';
    let reqBody = {
      url: '/rest/' + category,
      category: category,
      query: query
    };




    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("fetch: ", response);
        return response.json()
      }).then(function(json) {
      console.log('fetch parsed json', json);
      dispatch(fetchSuccess(category, json));
    }).catch(function(ex) {
      console.log('fetch parsing failed', ex);
    });

  };
}

export function fetchSuccess(category, json) {

  console.log("fetchSuccess: category: ", category);
  console.log("fetchSuccess: json: ", json);

  return {
    type: FETCH_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

