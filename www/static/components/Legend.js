
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
    let schema = { type: this.value, options: this.options };
    // (new IdBuilder(schema)).build();
    let builder = new PositionBuilder(schema);
    this.innerHTML = `
      <div>HHH
        <div>${this.value}</div>
        <svg preserveAspectRatio='xMinYMin slice'>
          <rect x='0' y='0' width='100%' height='100%' fill='white' stroke='red'/>
            <g stroke="black">
                ${builder.build()}
            </g>
        </svg>
      </div>
    `;
  }
}

customElements.define('x-legend', Legend);
