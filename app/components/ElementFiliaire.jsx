
import React  from 'react';
import config from 'helpers/config';

export default class ElementFiliaire extends React.Component {
  // http://facebook.github.io/react/docs/component-specs.html#getinitialstate
  render() {
    // Parameters
    const item    = this.props.item;

    var dd = [ 0 ];
    if (item.next) {
      for(var i in item.next) {
        if (i > 0) {
          dd[i] = dd[i-1] + item.next[i-1].filiaireWidth() + config.filiaire.spaceH;
        }
      }
    }

    return (
      <g>
        {
          <g>
            <g dangerouslySetInnerHTML={{__html: item.filiaireDraw()}} />
            <rect x={-item.filiaireAlignX()} y={0} width={item.filiaireWidth()} height={item.filiaireHeight()} fill='none' stroke='yellow' />
          </g>
        }
        {
          item.next && item.next.map((e, i) => (
            <g key={i} transform={'translate(0, ' + (item.filiaireHeight()) + ')'}>
              <line x1={0} y1={0} x2={0} y2={config.filiaire.marginV / 2} />
              <g key={i} transform={'translate(' +  dd[i] + ', ' + (config.filiaire.marginV / 2) + ')'}>
                <line x1={0} y1={0} x2={0} y2={config.filiaire.marginV} />
                {
                  ((i > 0) &&
                    <line x1={-(dd[i] - dd[i-1])} y1={0} x2={0} y2={0} />
                  )
                }
                <g key={i} transform={'translate(0, ' + config.filiaire.marginV / 2 + ')'}>
                  <ElementFiliaire item={e} />
                </g>
              </g>
            </g>
          ))
        }
      </g>
    );
  }
}

/*
  <circle cx={0} cy={0} r={3} stroke='red' fill='none' />

  <rect x={-item.filiaireWidth / 2} y={0} width={item.filiaireWidth} height={item.filiaireHeight} stroke={debug} fill='none' />
  <image x="0" y="0" width="128" height="146" transform="rotate(45)" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png"/>
  <path d={'M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0'} stroke={context.color} fill='none' />
  <line x1="50%" y1="50%" x2="0" y2="0" stroke="blue" />
  <line x1="100" y1="100" x2="200" y2="100" stroke="blue" />
  <rect x="87.5" y="100" width="25" height="25" stroke="green" fill='none' />
*/
