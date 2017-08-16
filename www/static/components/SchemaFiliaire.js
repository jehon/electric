
class SchemaFiliaire extends React.Component {
  render() {
    return (
        <MySVG
          width={800}
          height={600}
          viewBox='1500 0 800 600'
          title='my-electric-house - schema-filiaire'
        >
          <g transform='translate(50, 50)' stroke='black' fill='none' >
            <ElementFiliaire item={this.props.schema} />
          </g>
        </MySVG>
      );
  }
}

SchemaFiliaire.propTypes = {
  schema: React.PropTypes.object
};
