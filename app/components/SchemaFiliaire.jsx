
import React           from 'react';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    var context = {
      color: 'green',
      vertical: true
    };

    return (
      <div>
        <div>Toolbar and title</div>
        <svg width={1000} height={300} >
          <ElementFiliaire item={this.props.schema} context={context} x='50' y='300'/>
        </svg>
      </div>
    );
  }
}
