
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
      <SchemaFiliaire schema={state.oschema}/>,
      document.getElementById('schema')
    );

    // ReactDOM.render(
    //   <SchemaPosition schema={state.oschema} plan='cave'
    //     image={{ src: '/cave.jpg', scale: 0.50, viewBox: '175 100 850 550' }}
    //     />,
    //   document.getElementById('plan_cave')
    // );

    // ReactDOM.render(
    //   <SchemaPosition schema={state.oschema} plan='rdc'
    //     image={{ src: '/rdc.png', scale: 0.50, viewBox: '200 100 900 550' }}
    //     />,
    //   document.getElementById('plan_rdc')
    // );

    // ReactDOM.render(
    //   <SchemaPosition schema={state.oschema} plan='etage'
    //     image={{ src: '/etage.png', scale: 0.50, viewBox: '175 100 900 550' }}
    //     />,
    //   document.getElementById('plan_etage')
    // );

    // ReactDOM.render(
    //   <SchemaPosition schema={state.oschema} plan='grenier'
    //     image={{ src: '/grenier.png', scale: 0.50 }} />,
    //   document.getElementById('plan_grenier')
    // );

    ReactDOM.render(
       <SchemaPosition schema={state.oschema} plan='exterieurs'
         image={{ src: '/exterieurs.png', scale: 1 }} />,
       document.getElementById('plan_exterieurs')
    );
  });
});
