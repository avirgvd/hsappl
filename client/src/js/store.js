/**
 * Created by govind on 7/29/16.
 */

// (C) Copyright 2015-2016 Hewlett Packard Enterprise Development LP

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import DevTools from './DevTools';

// TODO: fix webpack loader to allow import * from './reducers'
import index from './reducers/indexreducers';
import item from './reducers/itemreducers';
import defReducer from './reducers/reducers';

let combinedReducers = combineReducers({index, item, defReducer});

let customizedCombinedReducers = (state, action) => {
  //self defined reducer to handle cross module state reducing
  let nextState = combinedReducers(state, action);
  return nextState;
};

export default function configureStore(preloadedState){
  return createStore(
    combinedReducers,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

// export default compose(
//   // DevTools.instrument()
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore)(customizedCombinedReducers);
//
