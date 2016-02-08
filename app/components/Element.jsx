
import React, { PropTypes } from 'react';
import away from 'helpers/away';
import elementHelper from 'helpers/elementHelper';

class Element extends React.Component {
  render() {
    var tp = away(20 + 5, this.props.item.orientation);
    var element = elementHelper(this.props.item);
    return (
      <g>
        {
          this.props.item && this.props.item.type && this.props.item.x && this.props.item.y &&
          <g transform={'translate(' + this.props.item.x + ',' + this.props.item.y + ')'}>
            <g transform={'scale(' + this.props.context.scale + ')'}>
              <g transform={'rotate(' + (this.props.item.orientation || 0) + ')'}>
                <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={this.props.context.color} fill='none' />
              </g>
              <circle cx='0'cy='0' r='1' fill='green'/>
              <circle cx={tp.x()} cy={tp.y()} r='2' fill='blue'/>
              <circle cx={20} cy={0} r='2' fill='red'/>
              <circle cx={0} cy={20} r='2' fill='red'/>
              <circle cx={-20} cy={0} r='2' fill='red'/>
              <circle cx={0} cy={-20} r='2' fill='red'/>
              <text textAnchor='middle' x={tp.x()} y={tp.y()} dy='+0.4em'>{this.props.item.name}</text>
            </g>
          </g>
        }
        {
          this.props.item.children && this.props.item.children.map((e, i) =>
              <Element key={i} item={{name: e.name || ((this.props.item.name || '') + i), ...e}} context={this.props.context}/>
            )
        }
      </g>
    );
  }
}

export default Element;

//           <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>

/*

          <Element item={{x:100, y:100, orientation: 0}} context={context} />

          <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />
*/

