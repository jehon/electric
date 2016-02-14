
import 'babel-core/polyfill';
import React            from 'react';
import SchemaPosition   from 'components/SchemaPosition';
import SchemaFiliaire   from 'components/SchemaFiliaire';
import schema           from 'schema';
import build            from 'helpers/build';

var oschema = build(schema);


React.render(
  <SchemaPosition schema={oschema} image={{ src: 'http://localhost/rdc.png', width: 1089, height: 722, scale: 0.75 }}/>,
  document.getElementById('plan1')
);
