
import React, { PropTypes } from 'react';
import SVGDrawing from 'components/SVGDrawing';
import Element from 'components/Element';

export default class SchemaPosition extends React.Component {
  render() {
    return (
      <div>
        Hello world!
        <SVGDrawing width={this.props.image.width} height={this.props.image.height}>
          <image x='0' y='0' width={this.props.image.width} height={this.props.image.height} xlinkHref={this.props.image.src} />
          <Element item={{x:100, y:100, orientation: 0}} context={{ scale: this.props.image.scale, color: 'red' }}/>
        </SVGDrawing>
      </div>
    );
  }
}

//           <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>

/*
          <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />
*/

