
import React, { PropTypes } from 'react';
import SVGDrawing from 'components/SVGDrawing';
import Element from 'components/Element';

export default class SchemaPosition extends React.Component {
  render() {
    var context = { scale: this.props.image.scale || 1, color: 'red' };
    return (
      <div>
        <div>Toolbar and title</div>
        <SVGDrawing width={this.props.image.width} height={this.props.image.height}>
          <image x='0' y='0' width={this.props.image.width} height={this.props.image.height} xlinkHref={this.props.image.src} />
          <Element item={this.props.schema} context={context} />
        </SVGDrawing>
      </div>
    );
  }
}
