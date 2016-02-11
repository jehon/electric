
import 'babel-core/polyfill';
import React from 'react';
import SchemaPosition from 'components/SchemaPosition';
import SchemaFiliaire from 'components/SchemaFiliaire';
import schema from 'schema';

React.render(
  <SchemaFiliaire schema={schema} />,
  document.getElementById('schema')
);

React.render(
  <SchemaPosition schema={schema} image={{ src: 'http://localhost/rdc.png', width: 1089, height: 722, scale: 0.75 }}/>,
  document.getElementById('plan1')
);
