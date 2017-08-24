
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
  //   this.image = {
  //     b64: ' data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  //     width: 1,
  //     height: 1,

  //     src: '',
  //     scale: 1,
  //     viewBox: '0 0 100 100'
  //   };
  //   getDataFromImageUrl(this.image.src)
  //     .then((data) => {
  //       this.image = Object.assign({}, this.image, data);
  //       this.render();
  //     });
  }

  static get observedAttributes() { return ['value', 'plan' ]; }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
  //   switch(attributeName) {
  //     case 'image': 

  //     case 'value':
  //       this[attributeName] = newValue;
  //       this.render();
  //       break;
  //   }
  // }

  // getChildren() {
  //   return `
  //     <image opacity='0.5'
  //         x='0' y='0'
  //         width=1 height=1
  //         xlinkHref=${this.image.b64} />
  //   `;
  }
}

customElements.define('schema-position', SchemaPosition);
