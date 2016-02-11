
import React           from 'react';
import SVGDrawing      from 'components/SVGDrawing';
import ElementPosition from 'components/ElementPosition';

function schemaClick(evt) {
  var e = evt.target;
  var dim = e.getBoundingClientRect();
  var x = evt.clientX - dim.left;
  var y = evt.clientY - dim.top;
  console.info('clicked on x: ' + Math.round(x) + ', y: ' + Math.round(y));
}

export default class SchemaPosition extends React.Component {
  render() {
    var context = {
      plan: 1,
      scale: this.props.image.scale || 1,
      color: 'red'
    };
    return (
      <div>
        <div>Toolbar and title</div>
        <SVGDrawing
            width={this.props.image.width} height={this.props.image.height}
            onClick={schemaClick}
            >
          <image
              x='0' y='0'
              width={this.props.image.width} height={this.props.image.height}
              xlinkHref={this.props.image.src} />
          <ElementPosition item={this.props.schema} context={context} />
        </SVGDrawing>
      </div>
    );
  }
}
