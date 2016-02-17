
import React           from 'react';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    return (
      <div>
        <div>Toolbar and title</div>
        <svg width={1000} height={300} >
          <g transform='translate(50, 50)' stroke='blue' fill='none' >
            <ElementFiliaire item={this.props.schema} />
          </g>
        </svg>
      </div>
    );
  }
}
