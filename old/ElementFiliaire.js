
class ElementFiliaire extends React.Component {
  render() {
    // Parameters
    const item    = this.props.item;
    const debug   = 'none';

    /* eslint-disable react/no-danger */
    return (
      <g>
        {
          <g>
            <g dangerouslySetInnerHTML={{__html: item.filiaireDraw()}} />
            <rect x={-item.filiaireAlignX()} y={0} width={item.filiaireHierarchicalWidth()} height={item.filiaireHeight()} fill='none' stroke={debug} />
            <text x={2} y={-2} fontFamily="Verdana" fontSize="6">
              {item.getReferenceLong()}
            </text>
          </g>
        }
        { item.next &&
          <g transform={'translate(0, ' + item.filiaireHeight() + ')'}>
            <line
                x1={0}
                x2={item.fililaireRelativePositionX4Next(item.next.length - 1) - item.fililaireRelativePositionX4Next(0)}
                y1={0}
                y2={0}
              />
            {
              item.next.map((e, i) => (
                <g key={i} transform={'translate(' +  item.fililaireRelativePositionX4Next(i) + ', 0)'}>
                  <line x1={0} x2={0} y1={0} y2={config.filiaire.marginV} />
                  <g key={i} transform={'translate(0, ' + config.filiaire.marginV + ')'}>
                    <ElementFiliaire item={e} />
                  </g>
                </g>
              ))
            }
          </g>
        }
        {
          (item.alternate.length > 0) &&
            <g transform={'translate(' + (item.filiaireWidth() + config.filiaire.spaceH) + ',' + (item.filiaireAlignAlternateY()) + ')'} >
              <line
                  x1={-config.filiaire.spaceH}
                  x2={Math.max(0, item.fililaireRelativePositionX4Next() - item.filiaireWidth()) + item.alternate[item.alternate.length-1].filiaireAlignX()}
                  y1={0}
                  y2={0}
                />
              <g transform={'translate(' + Math.max(0, item.fililaireRelativePositionX4Next() - item.filiaireWidth()) + ',0)'}>
                {
                  item.alternate.map((e, i) => (
                    <g key={i} transform={'translate(' + (item.fililaireRelativePositionX4Alternate(i) + e.filiaireAlignX()) + ', 0)'} >
                      <line x1={0} x2={0} y1={0} y2={config.filiaire.marginV} />
                      <g transform={'translate(0, ' + (config.filiaire.marginV) + ')'}>
                        <ElementFiliaire item={e} />
                      </g>
                    </g>
                  ))
                }
              </g>
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
