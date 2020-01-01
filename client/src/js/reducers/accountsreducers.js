/**
 * Created by govind on 12/25/19.
 */


import Immutable, {List, Map} from 'immutable';

import {ACCOUNTS_NAV, ACCOUNTS_LOAD, ACCOUNTS_UNLOAD, ACCOUNTS_SCROLL, ACCOUNTS_FAILURE, ACCOUNTS_REQUEST, ACCOUNTS_SUCCESS, ACCOUNTS_NEXT_MORE, ACCOUNTS_NEXT_SUCCESS} from '../actions/accounts';

const initialState = Immutable.fromJS({
      label: "Accounts",
      view: 'tiles',
      sort: 'date:dsc',
      result: {
        total: 0,
        items: []
      }
});


// ...state =>> Using object spread syntax for copying state based on documentation from
// http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
// this is where I specify which reducer handles which actions
const handlers = {

  [ACCOUNTS_LOAD]: (state = initialState, action) => {

    return initialState;
  },

  [ACCOUNTS_UNLOAD]: (state, action) => {

    console.log("Reducer ACCOUNTS_UNLOAD action: ", action);


    return initialState;
  },


  [ACCOUNTS_SUCCESS]: (state, action) => {

    console.log("ACCOUNTS_SUCCESS: state: ", state);
    // console.log("ACCOUNTS_SUCCESS: state.result: ", state.get("result"));
    console.log("ACCOUNTS_SUCCESS state: ", state.getIn(['label']));
    console.log("ACCOUNTS_SUCCESS state: ", state.getIn(['result', 'items']));
    console.log("ACCOUNTS_SUCCESS state: ", state.getIn(['result', 'total']));
    console.log("ACCOUNTS_SUCCESS: action: ", action);
    console.log("ACCOUNTS_SUCCESS: action.result.items: ", action.result.items);

    // var newState = Object.assign({}, state, {categories: {photos: {items: action.items}} });
    // var newState = { ...state, result: action.result};
    // var newState = { ...state, result: {total: action.result.total, items: action.result.items}};

    var newState = {};
    newState = state
      .setIn(
        ['result', 'items'],
        action.result.items
      )
      .setIn(
        ['result', 'total'],
        action.result.total
      );

    console.log("ACCOUNTS_SUCCESS: newState: ", newState);
    // console.log("ACCOUNTS_SUCCESS newState: ", newState.getIn(['label']));
    // console.log("ACCOUNTS_SUCCESS newState: ", newState.getIn(['result', 'items']));
    // console.log("ACCOUNTS_SUCCESS newState: ", newState.getIn(['result', 'total']));

    return initialState;
  },


  [ACCOUNTS_NEXT_SUCCESS]: (state, action) => {

    var newState = {};


    return newState;
  },

  [ACCOUNTS_FAILURE]: (state, action) => {

    return state;
  },
  [ACCOUNTS_NAV]: (state, action) => {
    return newState;
  },
};

export default function accountsReducer (state = initialState, action) {

  console.log("accountsReducer ", action);


  let handler = handlers[action.type];
  if (!handler) return state;
  // return exact immutable state that is returned by handler
  return handler(state, action);
  // return { ...state, ...handler(state, action) };
};
