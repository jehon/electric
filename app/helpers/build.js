
import * as references from 'class/references';

export default function build(data, previous = null) {
  var o;
  var t = data.type;
  if (typeof(references[t]) == 'undefined') {
    throw new Error('Reference [' + t + '] not found');
  }
  o = new references[t](data);
  o.setPrevious(previous);
  if (o.data.next) {
    o.data.next.map((e, i) => {
      o.data.next[i] = build(e, o);
    });
  }
  return o;
}
