
import * as references from 'class/references';
import ArrayElement    from 'class/ArrayElement';

export default function build(data, previous = null) {
  var o;
  if (data instanceof Array) {
    o = ArrayElement(data);
  } else {
    var t = data.type;
    if (typeof(references[t]) == 'undefined') {
      // console.error('Reference [' + t + '] not found');
      throw new Error('Reference [' + t + '] not found');
    }
    o = new references[t](data);
  }
  o.setPrevious(previous);
  if (o.data.next) {
    o.data.next = build(o.data.next, o);
  }
  // for(var i in o.data.next) {
  //   // Instantiate children
  //   o.data.next[i] = build(o.data.next[i], o);
  // }

  return o;
}
