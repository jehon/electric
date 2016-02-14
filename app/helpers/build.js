
import * as references from 'class/references';

export default function build(data, context) {
  var t = data.type;
  if (typeof(references[t]) == 'undefined') {
    // console.error('Reference [' + t + '] not found');
    throw new Error('Reference [' + t + '] not found');
  }
  var o = new references[t](data, context);
  for(var i in o.data.next) {
    o.data.next[i] = build(o.data.next[i]);
  }

  return o;
}
