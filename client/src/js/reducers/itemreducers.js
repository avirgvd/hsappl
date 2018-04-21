/**
 * Created by govind on 8/26/16.
 */


import {ITEM_LOAD, ITEM_UNLOAD, ITEM_SUCCESS, ITEM_FAILURE, ITEM_NAV, ITEM_NEW, ITEM_DELETE,
  ITEM_ADD, ITEM_ADD_SUCCESS, ITEM_ADD_FAILURE, ITEM_NOTIFICATIONS_SUCCESS, ITEM_MAP_SUCCESS} from '../actions/itemactions';

import Immutable, {List, Map} from 'immutable';


const NEW_ITEMS = {
  'photoframe': {
  }
};

const initialState = Immutable.fromJS({
  item: {}      
});

const handlers = {
  [ITEM_LOAD]: (state, action) => {
    var newState = state;

    return newState;

  },
  [ITEM_SUCCESS]: (state, action) => {
    var newState = state;

    return newState;

  },
  [ITEM_DELETE]: (state, action) => {
    var newState = state;

    return newState;

  },
  [ITEM_NAV]: (state, action) => {

    console.log("ITEM_NAV..........state: ", state);
    console.log("ITEM_NAV..............", action);
    var newState = state;
    // newState = state.setIn(['categories', action.category, 'result', 'item'], action.data);
    newState = state.setIn(['item'], action.data);
    console.log('index nav: newState: ', newState);
    
    return newState;

  },


};

export default function itemReducer (state = initialState, action) {

  console.log("itemReducer ", initialState.get('item'));

  let handler = handlers[action.type];
  if (!handler) return state;
  return handler(state, action);
  // return { ...state, ...handler(state, action) };
}
