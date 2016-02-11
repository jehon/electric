
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
    const element = new build(item, this.props.context);
    const color   = this.props.context.color || 'blue';
    const debug   = 'yellow';

    let x         = this.props.x;
    let y         = this.props.y;

    let ce        = [];
    let cx        = [];
    let cy        = [];

    if (item.children) {
      for(var i = 0; i < item.children.length; i++) {
        ce[i] = new build(item.children[i], context);
        if (i == 0) {
          cy[i] = y - element.filiaireHeight();
        } else {
          cy[i] = cy[i - 1] - ce[i-1].filiaireHeight();
        }
        cx[i] = x;
      }
    }

    return (
      <g>
        {
          <g transform={'translate(' + x + ',' + y + ')'} >
            <g transform={'rotate(' + (element.isVertical() ? 180 : 270) + ')'} >
              <g transform={'translate(' + (- element.width() / 2) + ',0)'}>
                <rect x={-element.filiaireWidth() / 2} y={0} width={element.filiaireWidth()} height={element.filiaireHeight()} stroke={debug} fill='none' />
                <g dangerouslySetInnerHTML={{__html: element.draw()}} stroke={color} fill='none' />
              </g>
            </g>
          </g>
        }
        {
          item.children && item.children.map((e, i) =>
              <ElementFiliaire key={i} context={context}
                item={Object.assign({name: e.name || ((item.name || '') + i)}, e)}
                x={cx[i]} y={cy[i]}
                />
            )
        }
      </g>
    );
  }
}

// export default ElementFiliaire;


/*

        {
          item.children && item.children.map((e, i) =>
              <ElementFiliaire key={i} item={{name: e.name || ((item.name || '') + i), ...e}} context={context}/>
            )
        }


          <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
          <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={context.color} fill='none' />
          <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
          <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
          <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />

*/

