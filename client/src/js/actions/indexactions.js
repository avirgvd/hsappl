/**
 * Created by govind on 7/27/16.
 */

// var restclient = require('promised-rest-client')({url: 'http://localhost:3000'});
// import fetch from 'isomorphic-fetch';

import history from '../RouteHistory';

import {getRESTApi, postRESTApi} from '../Api';

require('es6-promise').polyfill();


// index page
export const INDEX_NAV = 'INDEX_NAV';
export const INDEX_SCROLL = 'INDEX_SCROLL';
export const INDEX_PREV_MORE = 'INDEX_PREV_MORE';
export const INDEX_NEXT_MORE = 'INDEX_NEXT_MORE';

export const INDEX_LOAD = 'INDEX_LOAD';
export const INDEX_UNLOAD = 'INDEX_UNLOAD';

export const INDEX_SELECT = 'INDEX_SELECT';
export const INDEX_QUERY = 'INDEX_QUERY';
export const INDEX_ADD = 'INDEX_ADD';

// index api
export const INDEX_SUCCESS = 'INDEX_SUCCESS';
// export const INDEX_SUCCESS_FILTERS = 'INDEX_SUCCESS_FILTERS';
export const INDEX_PREV_SUCCESS = 'INDEX_PREV_SUCCESS';
export const INDEX_NEXT_SUCCESS = 'INDEX_NEXT_SUCCESS';

export const INDEX_FAILURE = 'INDEX_FAILURE';
export const INDEX_REQUEST = 'INDEX_REQUEST';

export const INDEX_WATCHER_UPDATE = 'INDEX_WATCHER_UPDATE';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

// actions that should be moved out of this file in future
export const SHOW_MODAL = 'SHOW_MODAL';

// Action creators

export function indexLoad(category, query) {
  console.log("indexLoad category", category);
  console.log("indexLoad data", query);

  return dispatch => {

    let uri = '/rest/index/items';
    // let uri = 'http://localhost:3000/rest/index/items';
    let reqBody = {
      url: '/rest/' + category,
      category: category,
      params: {
        from: 0,
        size: 10,
      },
      query: query
    };

    if(category === 'cards') {
      reqBody.resource = query;
      reqBody.params = {};
    }

    console.log("uri: ", uri);
    console.log("reqBody: ", reqBody);

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log("indexLoad: ", response);
        return response.json()
      }).then(function(result) {
      console.log('indexLoad: parsed json', result);
      dispatch(indexSuccess(category, result));
    }).catch(function(ex) {
      console.log('indexLoad: parsing failed', ex);
    });

  };
}

export function indexNextMore(category, index, query) {

  console.log("indexNextMore action query: ", query);

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/index/items';
    let uri = '/rest/index/items';
    // let reqBody = {
    //   url: '/rest/' + category,
    //   category: category,
    //   params: {
    //     from: index.result.currentEnd,
    //     size: 10,
    //   },
    //   query: {}
    // };

    var from = index.getIn(['result', 'currentEnd']);
    console.log("indexNextMore from: ", from);

    let reqBody = {
      url: '/rest/' + category,
      category: category,
      params: {
        from: from,
        size: 10,
      },
      query: query
    };

    console.log("indexNextMore: reqbody: ", JSON.stringify(reqBody));

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
        console.log("indexLoad: ", response);
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json);
      dispatch(indexNextSuccess(category, json));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });

  };
}

export function indexAdd(category, item) {

  return dispatch => {

    // let uri = 'http://192.168.1.147:3000/rest/add/';
    let uri = '/rest/add/';
    // let uri = 'http://localhost:3000/rest/add/';
    let reqBody = {
      url: '/rest/' + category,
      category: category,
      item: item
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
        console.log("indexAdd: ", response);
        return response.json()
      }).then(function(json) {
      console.log('indexAdd parsed json', json);
      dispatch(indexSuccess(category, json));
    }).catch(function(ex) {
      console.log('indexAdd parsing failed', ex);
    });

  };
}

export function indexUnLoad(category, index) {

  console.log("indexUnLoad");

  return {
    type: INDEX_UNLOAD,
    category: category,
  };
}
// export function indexScroll(category, pagePosition) {
//
//   return {
//     type: INDEX_SCROLL,
//     category: category,
//     pagePosition: pagePosition
//   };
// }

export function indexSuccess(category, items) {

  console.log("indexSuccess: category: ", category);
  console.log("################ indexSuccess: items: ", items);

  if(items) {
    return {
      type: INDEX_SUCCESS,
      category: category,
      hosturl: items.hosturl,
      result: items.result
    };
  }

}

export function indexNextSuccess(category, json) {


  return {
    type: INDEX_NEXT_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

export function showModal(category, json) {
  console.log('action showModal: category: ', category);
  console.log('action showModal: json: ', json);

  return {
    type: SHOW_MODAL,
    category: category,
    data: json
  };
}



export function indexNav (path, category, datajson, queryjson) {
  console.log("indexactions: indexNav path:", path);
  console.log("indexactions: indexNav category:", category);
  console.log("indexactions: indexNav datajson:", datajson);
  console.log("indexactions: indexNav queryjson:", queryjson);

  // TODO: Warning: [history] pushState is deprecated; use push instead 4/21/2018
  history.pushState(null, (path || `/${category}`));
  return {
    type: INDEX_NAV,
    category: category,
    data: datajson,
    query: queryjson
  };



}

// TODO: Write some comments on this index action 4/21/2018
export function globalFetch(category, query) {
  console.log("indexactions: fetch catgegory:", category);
  console.log("indexactions: fetch query:", query);

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

