
import React from 'react';
import away from 'helpers/away';
import build from 'helpers/build';

var debug = true;

export default class ElementFiliaire extends React.Component {
  // http://facebook.github.io/react/docs/component-specs.html#getinitialstate
  render() {
    // Parameters
    const context = this.props.context;
    const item    = this.props.item;

    // Helpers
    const color   = this.props.context.color || 'blue';
    const debug   = 'yellow';

    return (
      <g>
        {
          <g>
            <circle cx={0} cy={0} r={3} stroke='red' fill='none' />
            <g dangerouslySetInnerHTML={{__html: item.filiaireDraw()}} stroke={color} fill='none' />
          </g>
        }
        {
          item.next
          && <g transform={'translate(' + 0 + ', ' + item.filiaireHeight() + ')'}>
              <ElementFiliaire item={item.next} context={context} />
            </g>
        }
      </g>
    );
  }
}

// export default ElementFiliaire;


/*
          <g transform={'translate(' + (x - item.align) + ',' + y + ')'} >

              <rect x={-item.filiaireWidth / 2} y={0} width={item.filiaireWidth} height={item.filiaireHeight} stroke={debug} fill='none' />

        {
          item.next && item.next.map((e, i) =>
              <ElementFiliaire key={i} item={{name: e.name || ((item.name || '') + i), ...e}} context={context}/>
            )
        }


          <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
          <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={context.color} fill='none' />
          <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />

*/

