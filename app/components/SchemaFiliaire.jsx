
import React           from 'react';
import MySVG           from 'components/MySVG';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    return (
        <MySVG
          width={3000}
          height={600}
          title='my-electric-house - schema-filiaire'
        >
          <g transform='translate(50, 50)' stroke='black' fill='none' >
            <ElementFiliaire item={this.props.schema} />
          </g>
        </MySVG>
      );
  }
}

SchemaFiliaire.propTypes = {
  schema: React.PropTypes.object
};
