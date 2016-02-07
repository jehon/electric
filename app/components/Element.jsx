
import React, { PropTypes } from 'react';

export default class Element extends React.Component {
  render() {
    console.log(this.props.context.scale);
    return (
      <g transform={'translate(' + this.props.item.x + ',' + this.props.item.y + ')'}>
        <g transform={'scale(' + this.props.context.scale + ')'}>
          <g transform={'rotate(' + this.props.item.orientation + ')'}>
            <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={this.props.context.color} fill='none' />
          </g>
        </g>
      </g>
    );
  }
}

/*
  <circle fill="none" stroke="black" cx={src.x()} cy={src.y()} r={20*1} from="25" to="50"/>
  <line x1={src.x()} y1={src.y()} x2={src.away(10, 10).x()} y2={src.away(10, 10).y()} strokeWidth="5" stroke="orange"/>

  path -> arc: d='A rx ry x-axis-rotation large-arc-flag sweep-flag x y'

        <g transform={'scale(' + this.props.context.scale + ')'}>

*/
