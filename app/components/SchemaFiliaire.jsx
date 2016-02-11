
import React           from 'react';
import SVGDrawing      from 'components/SVGDrawing';
import ElementFiliaire from 'components/ElementFiliaire';

export default class SchemaFiliaire extends React.Component {
  render() {
    var context = {
      color: 'green',
      vertical: false
    };

    return (
      <div>
        <div>Toolbar and title</div>
        <SVGDrawing width={1000} height={300} >
          <ElementFiliaire item={this.props.schema} context={context} x='800' y='200' />
        </SVGDrawing>
      </div>
    );
  }
}
