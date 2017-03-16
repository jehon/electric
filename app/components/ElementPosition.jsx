
import React from 'react';
import away  from 'helpers/away';

var debug = false;

class ElementPosition extends React.Component {
  render() {
    // Parameters
    const item    = this.props.item;
    const context = this.props.context;

    // Helpers
    const tp      = away(item.height, item.positionOrientation);
    const debug   = 'none';

    /* eslint-disable react/no-danger */
    return (
      <g>
        {
          item.positionMustDrawOnPlan(context.plan) &&
          <g transform={'translate(' + item.positionX + ',' + item.positionY + ')'} >
            <g transform={'scale(' + context.scale + ')'} >
              <g transform={'rotate(' + (item.positionOrientation || 0) + ')'} >
                <rect x={-item.width / 2} y={0} width={item.width} height={item.height} stroke={debug} fill='none' />

                <g dangerouslySetInnerHTML={{__html: item.draw()}} stroke='red' fill='none' />
              </g>
              <g transform='rotate(45)'>
                <text x={tp.x} y={tp.y}
                    >
                  {item.getReferenceLong()}
                </text>
              </g>
            </g>
          </g>
        }
        {
          item.next && item.next.map((e, i) => (
            <ElementPosition key={i} item={e} context={context} />
          ))
        }
        {
          item.alternate && item.alternate.map((e, i) => (
            <ElementPosition key={i} item={e} context={context} />
          ))
        }
      </g>
    );
    /* eslint-enable */
  }
}
ElementPosition.propTypes = {
  item: React.PropTypes.object,
  context: React.PropTypes.object,
};

export default ElementPosition;


/*
                      textAnchor={away(1, item.positionOrientation).alignmentH()}
                      dy={away(1, item.positionOrientation).alignementV()}



          item.next && item.next.map((e, i) =>
              <ElementPosition key={i} item={e} context={context}/>
            )


          <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
          <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={context.color} fill='none' />
          <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />

*/

