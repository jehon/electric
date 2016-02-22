
import 'babel-core/polyfill';
import React            from 'react';
import ReactDOM         from 'react-dom';
import SchemaPosition   from 'components/SchemaPosition';
import SchemaFiliaire   from 'components/SchemaFiliaire';
import build            from 'helpers/build';

var state = {};

fetch('/api/v0.1/test.php').then(function(response) {
  response.json().then(function(json) {
    state.oschema = build(json);

    ReactDOM.render(
      <SchemaFiliaire schema={state.oschema} />,
      document.getElementById('schema')
    );

    ReactDOM.render(
      <SchemaPosition schema={state.oschema} image={{ src: '/cave.jpg', width: 1089, height: 722, scale: 0.60 }} plan='cave'/>,
      document.getElementById('plan_cave')
    );

    ReactDOM.render(
      <SchemaPosition schema={state.oschema} image={{ src: '/rdc.png', width: 1089, height: 722, scale: 0.60 }} plan='rdc'/>,
      document.getElementById('plan_rdc')
    );
  });
});
