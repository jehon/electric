
var debug = false;

class ElementPosition extends React.Component {


  attachedCallback() {
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
