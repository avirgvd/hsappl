/**
 * Created by govind on 9/15/18.
 */


/**
 * Created by govind on 7/27/16.
 */

import Immutable, {List, Map} from 'immutable';

import {
          DOCUMENTS_LOAD_NEXT_SUCCESS,
          DOCUMENTS_LOAD_SUCCESS,
          DOCUMENTS_NAV,
          DOCUMENTS_LOAD,
          DOCUMENTS_UNLOAD
          } from '../actions/documentsactions';

const statusFilter = {
  all: true,
  values: [
    { label: 'Critical', value: 'Critical' },
    { label: 'Warning', value: 'Warning' },
    { label: 'OK', value: 'OK' },
    { label: 'Disabled', value: 'Disabled' }
  ]
};

const statusAttribute = {name: 'status', label: 'Status', size: 'small',
  header: true, status: true, filter: statusFilter};

// Shape of the application state that is stored in Redux store
// const initialState = {
const initialState = Immutable.fromJS({
  activeCategory: null,
  responsive: 'multiple',
  selection: undefined,
  categories: {
    digitallibrary: {
      label: "Digital Library",
      view: 'tiles',
      sort: 'date:dsc',
      context: {},
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: []
      },
    },

    medical: {
      label: "Medical Documents",
      view: 'fullview',
      context: {},
      result: {
        items: []
      },
    },

    travel: {
      label: "Travel Documents",
      view: 'tiles',
      sort: 'date:dsc',
      context: {},
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    assets: {
      label: "Assets Documents",
      view: 'fullview',
      context: {},
      result: {
        items: []
      },
    },
    photos: {
      label: "Photos and Videos",
      view: 'fullview',
      query: {},
      context: {},
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    }

  }
});


// ...state =>> Using object spread syntax for copying state based on documentation from
// http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
// this is where I specify which reducer handles which actions
const handlers = {

  [DOCUMENTS_LOAD]: (state = initialState, action) => {

    console.log("DOCUMENTS_LOAD action: ", action);
    console.log("DOCUMENTS_LOAD state: ", state);

    // action.category has the category
    // action.items has the content




    // return update(state, changes);
    return state;
  },

  [DOCUMENTS_UNLOAD]: (state, action) => {

    console.log("Reducer INDEX_UNLOAD action: ", action);

    var newState = state
      .setIn(
        ['categories', action.category, 'result', 'items'],
        []
      )
      .setIn(
        ['categories', action.category, 'result', 'total'],
        0
      )
      .setIn(
        ['categories', action.category, 'result', 'currentEnd'],
        0
      );


    return newState;
  },

  [DOCUMENTS_LOAD_SUCCESS]: (state, action) => {

    console.log("DOCUMENTS_LOAD_SUCCESS state: ", state);
    console.log("DOCUMENTS_LOAD_SUCCESS state: ", state.getIn(['categories', action.category, 'result']));
    console.log("DOCUMENTS_LOAD_SUCCESS state: ", state.getIn(['categories', action.category, 'result', 'items']));
    console.log("DOCUMENTS_LOAD_SUCCESS action: ", action);

    var newState = {};

    newState = state
      .setIn(
        ['categories', action.category, 'result', 'items'],
        action.result.itemsData.items
      )
      .setIn(
        ['categories', action.category, 'result', 'total'],
        action.result.itemsData.total
      )
      .setIn(
        ['categories', action.category, 'result', 'currentEnd'],
        action.result.itemsData.count
      )
      .setIn(
        ['categories', action.category, 'result', 'filters'],
        action.result.filters
      );

    //
    // newState = {
    //   ...state, categories: {
    //     [action.category]: {
    //       result: {
    //         total: action.result.total,
    //         currentEnd: action.result.count,
    //         items: action.result.items
    //       }
    //     }
    //   }
    // };

    return newState;
  },

  [DOCUMENTS_LOAD_NEXT_SUCCESS]: (state, action) => {

    var newState = {};

    // var withNextItems = state.categories.photos.result.items.concat(action.result.items);
    console.log("index next success state: ", state);
    console.log("index next success action: ", action);

    var items = state.getIn(['categories', action.category, 'result', 'items']);
    var withNextItems = items.concat(action.result.itemsData.items);

    var currentEnd = state.getIn(['categories', action.category, 'result', 'currentEnd']) + action.result.itemsData.count;

    newState = state
      .setIn(
        ['categories', action.category, 'result', 'items'],
        withNextItems
      )
      .setIn(
        ['categories', action.category, 'result', 'total'],
        action.result.itemsData.total
      )
      .setIn(
        ['categories', action.category, 'result', 'currentEnd'],
        currentEnd
      );

    return newState;
  },

  [DOCUMENTS_NAV]: (state, action) => {
    console.log('DOCUMENTS_NAV: action: ', action);

    console.log("DOCUMENTS_NAV: state[action.category]", state.getIn(['categories', action.category, 'result', 'items']));

    var newState = state
      .setIn(['activeCategory'], action.category)
      .setIn(['categories', action.category, 'context'], action.query)
      .setIn(['categories', action.category, 'result', 'items'], []);

    console.log('DOCUMENTS_NAV: newState: ', newState);

    return newState;
  }

};

export default function documentsReducer (state = initialState, action) {
  let handler = handlers[action.type];

  console.log("documentsReducer ", action);
  if (!handler) return state;

  // return exact immutable state that is returned by handler
  return handler(state, action);
  // return { ...state, ...handler(state, action) };
};
