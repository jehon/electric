
import React           from 'react';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    return (
      <div>
        <div>Toolbar and title</div>
        <svg width={5000} height={500} >
          <g transform='translate(50, 50)' stroke='black' fill='none' >
            <ElementFiliaire item={this.props.schema} />
          </g>
        </svg>
      </div>
    );
  }
}

SchemaFiliaire.propTypes = {
  schema: React.PropTypes.object
};
