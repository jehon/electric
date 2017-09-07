
// function schemaClick(evt) {
//   var e = evt.target;
//   var dim = e.getBoundingClientRect();
//   var x = evt.clientX - dim.left;
//   var y = evt.clientY - dim.top;
//   console.info('clicked on x: ' + Math.round(x) + ', y: ' + Math.round(y));
// }

class SchemaFiliaire extends HTMLElement {
  setSchema(schema) {
    if (!schema) {
      console.log("no schema found");
      return ;
    }
    this.schema = schema;
    this._builder = new FiliaireBuilder(schema.schema);
    this.render();
  }

  render() {
    if (!this.schema) {
      console.log("no render");
      return ;
    }

    let res = this._builder.build();
    console.log("res: ", res);

    this.innerHTML = `
      <div>
        <svg preserveAspectRatio="xMinYMin slice" stroke='black' fill='none' >
          <rect x=0 y=0 width="100%" height="100%" fill="white" stroke="red"/>
          ${res.svg}
        </svg>
      </div>
    `;
  }
}

customElements.define('schema-filiaire', SchemaFiliaire);
