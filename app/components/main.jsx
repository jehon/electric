
import 'babel-core/polyfill';
import React            from 'react';
import ReactDOM         from 'react-dom';
import SchemaPosition   from 'components/SchemaPosition';
import SchemaFiliaire   from 'components/SchemaFiliaire';
import schema           from 'schema';
import build            from 'helpers/build';

var oschema = build(schema);

ReactDOM.render(
  <SchemaFiliaire schema={oschema} />,
  document.getElementById('schema')
);

ReactDOM.render(
  <SchemaPosition schema={oschema} image={{ src: 'http://localhost/rdc.png', width: 1089, height: 722, scale: 0.75 }}/>,
  document.getElementById('plan1')
);
