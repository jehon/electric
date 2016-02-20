
import 'babel-core/polyfill';
import React            from 'react';
import ReactDOM         from 'react-dom';
import SchemaPosition   from 'components/SchemaPosition';
import SchemaFiliaire   from 'components/SchemaFiliaire';
import build            from 'helpers/build';

var state = {};
// var oschema = build(schema);

fetch('/api/v0.1/test.php').then(function(response) {
  response.json().then(function(json) {
    console.log(json);
    state.oschema = build(json);
    console.log(state.oschema);

    ReactDOM.render(
      <SchemaFiliaire schema={state.oschema} />,
      document.getElementById('schema')
    );

    ReactDOM.render(
      <SchemaPosition schema={state.oschema} image={{ src: 'http://localhost/cave.jpg', width: 1089, height: 722, scale: 0.75 }} plan='cave'/>,
      document.getElementById('plan_cave')
    );

    ReactDOM.render(
      <SchemaPosition schema={state.oschema} image={{ src: 'http://localhost/rdc.png', width: 1089, height: 722, scale: 0.75 }} plan='rdc'/>,
      document.getElementById('plan_rdc')
    );

    ReactDOM.render(
      <textarea value={JSON.stringify(state.oschema)} />,
      document.getElementById('json')
    );
  });
});
