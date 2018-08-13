/**
 * Created by govind on 8/26/16.
 */


// var restclient = require('promised-rest-client')({url: 'http://localhost:3000'});
// import fetch from 'isomorphic-fetch';
import history from '../RouteHistory';


import {getRESTApi, postRESTApi} from '../Api';

// import {} from 'whatwg-fetch';
require('es6-promise').polyfill();

// ITEM page
export const ITEM_NAV = 'ITEM_NAV';
export const ITEM_NEW = 'ITEM_NEW';
export const ITEM_ADD = 'ITEM_ADD';
export const ITEM_EDIT = 'ITEM_EDIT';
export const ITEM_UPDATE = 'ITEM_UPDATE';
export const ITEM_REMOVE = 'ITEM_REMOVE';

export const ITEM_LOAD = 'ITEM_LOAD';
export const ITEM_UNLOAD = 'ITEM_UNLOAD';

export const ITEM_SELECT = 'ITEM_SELECT';
export const ITEM_QUERY = 'ITEM_QUERY';
export const ITEM_DELETE = 'ITEM_DELETE';

// ITEM api
export const ITEM_SUCCESS = 'ITEM_SUCCESS';
export const ITEM_FAILURE = 'ITEM_FAILURE';
export const ITEM_REQUEST = 'ITEM_REQUEST';

export const ITEM_WATCHER_UPDATE = 'ITEM_WATCHER_UPDATE';


// index api
export const INDEX_AGGREGATE_SUCCESS = 'INDEX_AGGREGATE_SUCCESS';
export const ITEM_ADD_SUCCESS = 'ITEM_ADD_SUCCESS';
export const ITEM_ADD_FAILURE = 'ITEM_ADD_FAILURE';
export const ITEM_NOTIFICATIONS_SUCCESS = 'ITEM_NOTIFICATIONS_SUCCESS';
export const ITEM_NOTIFICATIONS_FAILURE = 'ITEM_NOTIFICATIONS_FAILURE';
export const ITEM_MAP_SUCCESS = 'ITEM_MAP_SUCCESS';
export const ITEM_MAP_FAILURE = 'ITEM_MAP_FAILURE';

// Action creators

export function itemLoad(category, selection) {

  console.log("itemLoad: category: ", category, " selection: ", selection);

  return dispatch => {
    let uri = '/rest/category/' + category;
    // let uri = 'http://localhost:3000/rest/index/items';
    let reqBody = {
      url: '/rest/' + category,
      category: category,
      id: selection.id
    };
  
  
    postRESTApi(uri, reqBody)
    .then(function(response) {
      console.log("itemLoad: ", response);
      return response.json()
    }).then(function(itemdata) {
      console.log('itemLoad: parsed json', itemdata);
    dispatch(itemSuccess(category, itemdata));
    }).catch(function(ex) {
      console.log('itemLoad: parsing failed', ex);
    });
      
  };

}

export function itemUnLoad(category, selection) {

  return {
    type: ITEM_UNLOAD,
    category: category,
    items: [
    ]
  };
}

export function itemProcess(category, id, data) {
  console.log("itemProcess id: ", id);
  console.log("itemProcess data: ", data);

  return dispatch => {
    
        let uri = '/rest/processitem';
        // let uri = 'http://192.168.1.147:3000/rest/updateitem';
    
    
        let reqBody = {
          category: category,
          id: id,
          action: data
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
            console.log('parsed response', response);
            return response.json()
          }).then(function(json) {
          console.log('parsed json', json);
          // dispatch(indexNav("/contacts", "contacts"));
        }).catch(function(ex) {
          console.log('parsing failed', ex);
        });
    
      };
    
  
}

export function itemUpdate(category, id, data) {

  console.log("itemUpdate action selection: ", id);

  return dispatch => {

    let uri = '/rest/updateitem';
    // let uri = 'http://192.168.1.147:3000/rest/updateitem';


    let reqBody = {
      category: category,
      id: id,
      update: data
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
        console.log('parsed response', response);
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json);
      // dispatch(indexNav("/contacts", "contacts"));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });

  };

}

export function itemDelete(category, selection) {

  console.log("itemDelete action selection: ", selection);

  return dispatch => {

    let uri = '/rest/deleteitem';
    // let uri = 'http://localhost:3000/rest/deleteitem';

    let reqBody = {
      category: category,
      id: selection.id
    };

    let restRequest = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    };

    // fetch(uri, restRequest)
    postRESTApi(uri, reqBody)
      .then(function(response) {
        console.log('parsed response', response);
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json);
      dispatch(itemNav("/contacts", "contacts"));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });

  };

  // return {
  //   type: ITEM_DELETE,
  //   category: category,
  //   id: selection.id
  // };
}

export function itemSuccess(category, itemdata) {

  return {
    type: ITEM_SUCCESS,
    category: category,
    data: itemdata
  };
}

export function itemNav (path, category, json) {
  console.log("itemactions: itemNav path:", path);
  console.log("itemactions: itemNav json:", json);
  console.log("itemactions: itemNav category:", category);

  history.pushState(null, (path || `/${category}`));
  return {
    type: ITEM_NAV,
    category: category,
    data: json
  };

}
