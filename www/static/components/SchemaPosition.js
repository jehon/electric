
// function schemaClick(evt) {
//   var e = evt.target;
//   var dim = e.getBoundingClientRect();
//   var x = evt.clientX - dim.left;
//   var y = evt.clientY - dim.top;
//   console.info('clicked on x: ' + Math.round(x) + ', y: ' + Math.round(y));
// }

class SchemaPosition extends HTMLElement {
  constructor() {
    super();
    this.plan = {
      b64: ' data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      width: 1,
      height: 1,

      src: '',
      scale: 1,
      viewBox: '0 0 100 100',
      title: 'Loading...'
    };
  }

  setSchema(schema) {
    if (!schema) {
      console.log("no schema found");
      return ;
    }
    console.log("set schema: ", schema);
    this.schema = schema;
    this._builder = new PositionBuilder(schema);
    this.render();
  }

  static get observedAttributes() { return [ 'value' ]; }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    switch(attributeName) {
      case 'value':
        this.value = newValue;
      //   getDataFromImageUrl(this.plan.src)
      //     .then((data) => {
      //       this.plan.b64 = Object.assign({}, this.plan.b64, data);
      //       this.render();
      //     });
          break;
    }
  }

  render() {
    if (!this.schema || !this.value) {
      console.log("no render");
      return ;
    }
    this.innerHTML = `
      <div>
        <div>${this.value}: ${this.title}</div>
        <svg preserveAspectRatio='xMinYMin slice' width='1000px' height='800px'>
          <rect x='0' y='0' width='100%' height='100%' fill='white' stroke='red'/>
          <image opacity='0.5' x='0' y='0' width=1 height=1 xlinkHref=${this.plan.b64} />
          ${this._builder.build("" + this.value)}
        </svg>
      </div>
    `;
  }
}

customElements.define('schema-position', SchemaPosition);
