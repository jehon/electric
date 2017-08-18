
class MySVG extends HTMLElement {
  static get observedAttributes() { return ['value']; }

  constructor() {
    super();
    this.title = "Define a title";
    this.svgOptions = {
      height: 800,
      width: 600,
    }
  }

  setSchema(schema) {
    this.schema = schema;
    this.render();
  }

  render() {
    console.log("render called");
    this.innerHTML = `
      <div>
        <div>${this.title}</div>
        <svg
          preserveAspectRatio='xMinYMin slice'
          >
          <rect x='0' y='0' width='100%' height='100%' fill='white' stroke='red'/>
          ${this.getChildren()}
        </svg>
      </div>
    `;
  }

  getChildren() {
    return "";
  }
}


// MySVG.propTypes = {
//   title:     React.PropTypes.string,
//   height:    React.PropTypes.number,
//   width:     React.PropTypes.number,
//   children:  React.PropTypes.oneOfType([
//     React.PropTypes.arrayOf(React.PropTypes.node),
//     React.PropTypes.node
//   ])
// };
