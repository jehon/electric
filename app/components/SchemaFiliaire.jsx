
import React           from 'react';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    var context = {
      color: 'green'
    };

    return (
      <div>
        <div>Toolbar and title</div>
        <svg width={1000} height={300} >
          <g transform='translate(50, 50)'>
            <ElementFiliaire item={this.props.schema} context={context}/>
          </g>
        </svg>
      </div>
    );
  }
}
