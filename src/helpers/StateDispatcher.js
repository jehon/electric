/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 */

const lastState = Symbol("lastState");
const listMap = Symbol("listMap");
const listKeys = Symbol("listKeys");

const cnt = Symbol("cnt");
const firing = Symbol("firing");
const firingRound = Symbol("firingRound");

export default class StateDispatch {
  constructor(_lastState = false) {
    this[lastState] = _lastState;
    this[cnt] = 0;
    this[listMap] = new WeakMap();
    this[listKeys] = {};
    this[firingRound] = 0;
  }

  getState() {
    return this[lastState];
  }

  setState(newState) {
    this[lastState] = newState;

    let firingRoundNow = ++this[firingRound];

    Object.keys(this[listKeys]).forEach((o) => {
      // If we are not in the correct round, abort, an other cycle is already running
      // with more up-to-date data
      if (firingRoundNow != this[firingRound]) {
        return;
      }
      let e = this[listKeys][o];
      if (this[listMap].has(e)) {
        this[listMap].get(e)(this[lastState]);
      }
    });

    return this;
  }

  // Add a callback or a collection of callbacks to the list
  add(fn) {
    if (typeof fn != "function") {
      throw "Could not add something else than functions !";
    }
    let index = this[cnt]++;
    this[listKeys][index] = { key: index, value: { index: index } };
    this[listMap].set(this[listKeys][index], fn);

    fn(this[lastState]);
    return () => {
      // A function to stop listening to events!
      let k = this[listKeys][index];
      delete this[listKeys][index];
      this[listMap].delete(k);
    };
  }
}
