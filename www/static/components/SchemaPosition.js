
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
    this._builder = new PositionBuilder(schema.schema);
    this.render();
  }

  static get observedAttributes() { return [ 'value' ]; }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    switch(attributeName) {
      case 'value':
        this.value = newValue;
        break;
    }
    this.render();
  }

  render() {
    if (!this.schema || !this.value) {
      console.log("no render");
      return ;
    }
    if (!(this.value in this.schema.plans)) {
      console.log("Plan is unknown: ", this.value, " in ", this.schema.plans);
      return ;
    }

    let plan = this.schema.plans[this.value];
    imageSize(plan.src).then(size => {
      plan.width = size.width;
      plan.height = size.height;
  
      console.log("Plan: ", plan);

      this.innerHTML = `
        <div>
          <div>${this.value}: ${this.title}</div>
          <svg preserveAspectRatio="xMinYMin slice" width="${plan.width}px" height="${plan.height}px" view-box="${plan.viewBox}">
            <rect x=0 y=0 width="100%" height="100%" fill="white" stroke="red"/>
            <image opacity=0.5 x=0 y=0 width="${plan.width}px" height="${plan.height}px" href=${plan.src} />
            ${this._builder.build("" + this.value)}
          </svg>
        </div>
      `;
    });
  }
}

customElements.define('schema-position', SchemaPosition);
