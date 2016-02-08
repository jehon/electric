
import 'babel-core/polyfill';
import React from 'react';
import SchemaPosition from 'components/SchemaPosition';
import schema from 'schema';

React.render(
  <SchemaPosition image={{ src: 'http://localhost/rdc.png', width: 1089, height: 722, scale: 0.75 }} schema={schema}/>,
  document.getElementById('schema')
);
