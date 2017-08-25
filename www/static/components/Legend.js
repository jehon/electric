
// function schemaClick(evt) {
//   var e = evt.target;
//   var dim = e.getBoundingClientRect();
//   var x = evt.clientX - dim.left;
//   var y = evt.clientY - dim.top;
//   console.info('clicked on x: ' + Math.round(x) + ', y: ' + Math.round(y));
// }

class Legend extends HTMLElement {
  constructor() {
    super();
    this.value = "P";
    this.options = {};
  }

  static get observedAttributes() { return ['value', 'options' ]; }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    switch(attributeName) {
      case 'value':
        this.value = this.getAttribute("value");
        this.render();
        break;
      case 'options':
        this.optins = this.getAttribute("options");
        this.render();
        break;
    }
  }

  render() {
    let builder = new Builder({ type: this.value, options: this.options, x: 10, y: 10 });
    this.innerHTML = `
      <div>HHH
        <div>${this.value}</div>
        <svg preserveAspectRatio='xMinYMin slice'>
          <rect x='0' y='0' width='100%' height='100%' fill='white' stroke='red'/>
          ${builder.build()}
        </svg>
      </div>
    `;
  }
}

customElements.define('x-legend', Legend);
