/**
 * Created by govind on 9/25/16.
 */

import {ITEM_LOAD, ITEM_UNLOAD, ITEM_SUCCESS, ITEM_FAILURE, ITEM_NAV, ITEM_NEW,
  ITEM_ADD, ITEM_ADD_SUCCESS, ITEM_ADD_FAILURE, ITEM_NOTIFICATIONS_SUCCESS, ITEM_MAP_SUCCESS} from '../actions/itemactions';

import {IMPORT_LOCAL_FILES, IMPORT_SUCCESS} from '../actions/actions';
import Immutable, {List, Map} from 'immutable';


const initialState = Immutable.fromJS({
  activeCategory: null,
  responsive: 'multiple',
  result: {}
});

const handlers = {
  [IMPORT_LOCAL_FILES]: (state, action) => {
    var newState = state;

    return newState;

  },
  [ITEM_SUCCESS]: (state, action) => {
    var newState = state;

    return newState;

  },


};

export default function defReducer (state = initialState, action) {

  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
