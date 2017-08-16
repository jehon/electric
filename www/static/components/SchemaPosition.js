
function schemaClick(evt) {
  var e = evt.target;
  var dim = e.getBoundingClientRect();
  var x = evt.clientX - dim.left;
  var y = evt.clientY - dim.top;
  console.info('clicked on x: ' + Math.round(x) + ', y: ' + Math.round(y));
}

class SchemaPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        b64: ' data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        width: 1,
        height: 1
      }
    };
    let self = this;
    getDataFromImageUrl(this.props.image.src)
      .then(function(data) {
        self.setState({ image: data });
      });
  }

  render() {
    var context = {
      plan: this.props.plan,
      scale: this.props.image.scale || 1,
    };

    return (
      <div>
        <MySVG title={'my-electric-house - ' + this.props.plan}
          width={this.state.image.width}
          height={this.state.image.height}
          onClick={schemaClick}
          viewBox={this.props.image.viewBox}
        >
          <image opacity='0.5'
              x='0' y='0'
              width={this.state.image.width} height={this.state.image.height}
              xlinkHref={this.state.image.b64} />
          <ElementPosition item={this.props.schema} context={context} />
        </MySVG>
      </div>
    );
  }
}

SchemaPosition.propTypes = {
  schema: React.PropTypes.object,
  plan: React.PropTypes.string,
  image: React.PropTypes.object
};
