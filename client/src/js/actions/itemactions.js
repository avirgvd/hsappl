/**
 * Created by govind on 8/26/16.
 */


// var restclient = require('promised-rest-client')({url: 'http://localhost:3000'});
// import fetch from 'isomorphic-fetch';
import {indexNav} from '../actions/indexactions';
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

  return {
    type: ITEM_LOAD,
    category: category,
    items: [
    ]
  };

  // return dispatch => {



    // let uri = 'http://localhost:3000/rest/photo';
    // let restRequest = {
    //   url: '/rest/photo',
    //   category: category
    // };
    //
    // fetch(uri)
    //   .then(function(response) {
    //     return response.json()
    //   }).then(function(json) {
    //   console.log('parsed json', json);
    //   dispatch(itemSuccess("photoframe", json.items));
    // }).catch(function(ex) {
    //   console.log('parsing failed', ex);
    // });



  // };
}

export function itemUnLoad(category, selection) {

  return {
    type: ITEM_UNLOAD,
    category: category,
    items: [
    ]
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
      dispatch(indexNav("/contacts", "contacts"));
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

export function itemSuccess(category, items) {

  return {
    type: ITEM_SUCCESS,
    category: category,
    items: items
  };
}
