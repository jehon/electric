
import * as references from 'class/references';

export default function build(data, nameStructure = { base: 'main', index: 0 }) {
  var o;
  var t = data.type;
  if (typeof(references[t]) == 'undefined') {
    throw new Error('Reference [' + t + '] not found');
  }
  o = new references[t](data);
  if (o.data.reference) {
    nameStructure.base = o.data.reference;
    nameStructure.index = 0;
    nameStructure.alt = 0;
    o.setNames(o.data.reference, o.data.reference);
  } else {
    let short = nameStructure.index;
    o.setNames(short, nameStructure.base + '.' + short);
  }
  if (o.data.next) {
    o.data.next.map((e, i) => {
      if (o.data.next.length == 1) {
        o.data.next[i] = build(e, Object.assign({}, nameStructure, { index: nameStructure.index + 1 }));
      } else {
        o.data.next[i] = build(e, Object.assign({}, nameStructure,
          { base: nameStructure.base + '.'
            + (nameStructure.index == 0 ? '' : nameStructure.index + '.')
            + i,
            index: 1
          }
        ));
      }
    });
  }
  if (o.data.alternate) {
    o.data.alternate.map((e, i) => {
      if (o.data.alternate.length == 1) {
        o.data.alternate[i] = build(e, Object.assign({}, nameStructure, { base: nameStructure.base + '.' + nameStructure.index, index: 1 }));
      } else {
        o.data.alternate[i] = build(e, Object.assign({}, nameStructure, { base: nameStructure.base + '.' + nameStructure.index + '/' + i, index: 1 }));
      }
    });
  }
  return o;
}
