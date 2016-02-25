
import React  from 'react';
import config from 'helpers/config';

export default class ElementFiliaire extends React.Component {
  render() {
    // Parameters
    const item    = this.props.item;

    var dd = [ 0 ];
    if (item.next) {
      for(var i in item.next) {
        if (i > 0) {
          dd[i] = dd[i-1] + item.next[i-1].filiaireHierarchicalWidth() + config.filiaire.spaceH;
        }
      }
    }

    function altXPos(j) {
      let dda = 0;
      if (item.next && (item.next.length > 0)) {
        dda += dd[item.next.length - 1] + item.next[item.next.length - 1].filiaireHierarchicalWidth();
      }
      dda = Math.max(dda, item.filiaireWidth());
      for(let k = 0; k < j; k++) {
        dda += 0;
      }
      return dda;
    }

    /* eslint-disable react/no-danger */
    return (
      <g>
        {
          <g>
            <g dangerouslySetInnerHTML={{__html: item.filiaireDraw()}} />
            <rect x={-item.filiaireAlignX()} y={0} width={item.filiaireHierarchicalWidth()} height={item.filiaireHeight()} fill='none' stroke='yellow' />
            <text x={2} y={-2} fontFamily="Verdana" fontSize="6">
              {item.getReferenceLong()}
            </text>
          </g>
        }
        {
          item.next && item.next.map((e, i) => (
            <g key={i} transform={'translate(0, ' + (item.filiaireHeight()) + ')'}>
              <g key={i} transform={'translate(' +  dd[i] + ', 0)'}>
                <line x1={0} y1={0} x2={0} y2={config.filiaire.marginV} />
                {
                  ((i > 0) &&
                    <line x1={-(dd[i] - dd[i-1])} y1={0} x2={0} y2={0}/>
                  )
                }
                <g key={i} transform={'translate(0, ' + config.filiaire.marginV / 2 + ')'}>
                  <ElementFiliaire item={e} />
                </g>
              </g>
            </g>
          ))
        }
        {
          item.alternate &&
          <g transform={'translate(' + altXPos(0) + ', 10)'}>
          {
            item.alternate.map((e, i) => (
              <g key={i} transform='translate(10,0)'>
                <line x1={10-altXPos(0)} y1={0} x2={0} y2={0} />
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
        }
      </g>
    );
    /* eslint-enable */
  }
}

ElementFiliaire.propTypes = {
  item: React.PropTypes.object
};
