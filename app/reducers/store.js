
import { combineReducers, createStore }                           from 'redux';
// import thunkMiddleware                                         from 'redux-thunk';
// import { DevTools, DebugPanel, LogMonitor }                       from 'redux-devtools/lib/react';

import prefs                                                      from 'reducers/prefsReducers';
import connection                                                 from 'reducers/connectionReducers';
import stateReducers                                              from 'reducers/stateReducers';
import circuitReducers                                            from 'reducers/circuitReducers';

let store = createStore(
  function(state, action) {
    // Log
    if (typeof(window.__karma__) == 'undefined') {
      console.log('Action: ', action.type, ' with ', action.payload);
    }

    // Work the state
    state = combineReducers({
      prefs,
      connection,
      state:      stateReducers,
      circuit:    circuitReducers,
    })(state, action);
    return state;
  }
);

export default store;
