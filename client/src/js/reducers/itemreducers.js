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
  activeCategory: null,
  responsive: 'multiple',
  result: {}
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


};

export default function itemReducer (state = initialState, action) {

  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
