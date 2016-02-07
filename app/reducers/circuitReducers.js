
import catalog from 'reducers/catalog';

catalog._define('CIRCUIT_STORE');
catalog._define('CIRCUIT_CLEAR');

export default function(state, action) {
  if (!state || action.type == catalog.CIRCUIT_CLEAR) {
    state = {};
  }
  if (action.type == catalog.CIRCUIT_STORE) {
    return action.payload;
  }

  return state;
}
