/**
 * Created by govind on 7/27/16.
 */

import { combineReducers } from 'redux';
import update from 'react/lib/update';
import Immutable, {List, Map} from 'immutable';

import {INDEX_NAV, INDEX_LOAD, INDEX_UNLOAD, INDEX_SCROLL, INDEX_FAILURE, INDEX_REQUEST, INDEX_SUCCESS, INDEX_SUCCESS_FILTERS, INDEX_NEXT_MORE, INDEX_NEXT_SUCCESS, SHOW_MODAL} from '../actions/indexactions';

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
  categories: {
    items: {
      label: "Index",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: []
      },
    },

    browse: {
      label: "Browse Information",
      view: 'fullview',
      showModal: false,
      result: {
        items: {}
      },
    },

    assets: {
      label: "Assets",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    assetinfo: {
      label: "Asset Information",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },
    assettypes: {
      label: "Asset Information",
      view: 'fullview',
      showModal: false,
      result: {
        items: {}
      },
    },

    digitallibrary: {
      label: "Digital Library",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    bookinfo: {
      label: "Book Information",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },
    messages: {
      label: "Incoming Messages",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    messageitem: {
      label: "Message information",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },
    financials: {
      label: "Financials",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: []
      },
    },
    financialitem: {
      label: "Financial Item",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },



    photos: {
      label: "Photos and Videos",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: false,
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    photosframe: {
      label: "Photos Frame",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },
    contacts: {
      label: "Contacts",
      view: 'tiles',
      sort: 'date:dsc',
      showModal: 'false',
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: [],
        filters: {}
      },
    },
    contactinfo: {
      label: "Contact Information",
      view: 'fullview',
      showModal: false,
      result: {
        item: {}
      },
    },
    activity: {
      label: "Activity",
      view: 'table',
      sort: 'created:desc',
      attributes: [
        {name: 'associatedResourceName', label: 'Resource', size: 'medium'},
        statusAttribute,
        {name: 'name', label: 'Name', header: true},
        {name: 'created', label: 'Time',
          timestamp: true, size: 'medium', secondary: true},
        {name: 'state', label: 'State', size: 'medium', secondary: true,
          filter: {
            all: true,
            values: [
              { label: 'Active', value: 'Active' },
              { label: 'Cleared', value: 'Cleared' },
              { label: 'Running', value: 'Running' },
              { label: 'Completed', value: 'Completed' }
            ]
          }
        }
      ]
    }
  }
});


// ...state =>> Using object spread syntax for copying state based on documentation from
// http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
// this is where I specify which reducer handles which actions
const handlers = {

  [INDEX_LOAD]: (state = initialState, action) => {

    console.log("INDEX_LOAD action: ", action);
    console.log("INDEX_LOAD state: ", state);

    // action.category has the category
    // action.items has the content

    var newState = {};

    if (action.category === 'photos'
      || action.category === 'contacts'
      || action.category === 'assets'
      || action.category === 'digitallibrary'
      || action.category === 'financials') {
      newState = { ...state, categories: {
          photos: {
            result: {
              total: action.result.total,
              currentEnd: action.result.count,
              items: action.result.items
            }
          }
        }
      };
    // } else if (action.category === 'contacts') {
    //   newState = {
    //     ...state, categories: {
    //       contacts: {
    //         result: {
    //           total: action.result.total,
    //           currentEnd: action.result.count,
    //           items: action.result.items
    //         }
    //       }
    //     }
    //   };
    // } else if (action.category === 'assets') {
    //   newState = {
    //     ...state, categories: {
    //       contacts: {
    //         result: {
    //           total: action.result.total,
    //           currentEnd: action.result.count,
    //           items: action.result.items
    //         }
    //       }
    //     }
    //   };
    } else if (action.category === 'assettypes') {
      newState = {
        ...state, categories: {
          contacts: {
            result: {
              total: action.result.total,
              items: action.result.items
            }
          }
        }
      };
    } else newState = state;


    // return update(state, changes);
    return state;
  },

  [INDEX_UNLOAD]: (state, action) => {

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

  [INDEX_SCROLL]: (state = initialState, action) => {

    return state;
  },

  [INDEX_REQUEST]: (state, action) => {

    return state;
  },

  [INDEX_SUCCESS]: (state, action) => {

    // var newState = Object.assign({}, state, {categories: {photos: {items: action.items}} });
    // var newState = { ...state, categories: {photos: {items: action.items}}};
    var newState;

    console.log("index_succeess state: ", state);
    console.log("index_succeess action: ", action);

    newState = state
      .setIn(
        ['categories', action.category, 'result', 'items'],
        action.result.items
      )
      .setIn(
        ['categories', action.category, 'result', 'total'],
        action.result.total
      )
      .setIn(
        ['categories', action.category, 'result', 'currentEnd'],
        action.result.count
      );

    return newState;
  },

  [INDEX_SUCCESS_FILTERS]: (state, action) => {

    // var newState = Object.assign({}, state, {categories: {photos: {items: action.items}} });
    // var newState = { ...state, categories: {photos: {items: action.items}}};
    var newState;

    console.log("index_succeess_filters state: ", state);
    console.log("index_succeess_filters action: ", action);

    newState = state
      .setIn(
        ['categories', action.category, 'result', 'filters'],
        action.result
      );

    return newState;
  },

  [INDEX_NEXT_SUCCESS]: (state, action) => {


    var newState = {};

    // var withNextItems = state.categories.photos.result.items.concat(action.result.items);
    console.log("index next success state: ", state);
    console.log("index next success action: ", action);

    var items = state.getIn(['categories', action.category, 'result', 'items']);
    var withNextItems = items.concat(action.result.items);

    var currentEnd = state.getIn(['categories', action.category, 'result', 'currentEnd']) + action.result.count;

    newState = state
      .setIn(
        ['categories', action.category, 'result', 'items'],
        withNextItems
      )
      .setIn(
        ['categories', action.category, 'result', 'total'],
        action.result.total
      )
      .setIn(
        ['categories', action.category, 'result', 'currentEnd'],
        currentEnd
      );

    return newState;
  },

  [INDEX_FAILURE]: (state, action) => {

    return state;
  },
  [INDEX_NAV]: (state, action) => {
    console.log('index nav: action: ', action);

    var newState = state.setIn(['categories', action.category, 'result', 'item'], action.data);

    console.log('index nav: newState: ', newState);

    return newState;
  },

  [SHOW_MODAL]: (state, action) => {

    console.log('show_modal: action: ', action);
    var newState = state.setIn(['categories', action.category, 'showModal'], action.data.showModal);


    console.log('show_modal: newState: ', newState);

    return newState;
  },


};

export default function indexReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;

  // return exact immutable state that is returned by handler
  return handler(state, action);
  // return { ...state, ...handler(state, action) };
};
