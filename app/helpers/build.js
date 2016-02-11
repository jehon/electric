
import * as references from 'class/references';

export default function build(data, context) {
  if (typeof(references[data.type]) == 'undefined') {
    console.error('Reference ' + data.type + ' not found');
    throw new Error('Reference ' + data.type + 'not found');
  }
  return new references[data.type](data, context);
}
