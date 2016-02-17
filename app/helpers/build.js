
import * as references from 'class/references';
// import ArrayElement    from 'class/ArrayElement';

export default function build(data, previous = null) {
  var o;
  // if (data instanceof Array) {
  //   o = new ArrayElement(data);
  // } else {
  var t = data.type;
  if (typeof(references[t]) == 'undefined') {
    // console.error('Reference [' + t + '] not found');
    throw new Error('Reference [' + t + '] not found');
  }
  o = new references[t](data);
  // }
  o.setPrevious(previous);
  if (o.data.next) {
    o.data.next.map((e, i) => {
      o.data.next[i] = build(e, o);
    });
    // o.data.next = build(o.data.next, o);
  }
  return o;
}
