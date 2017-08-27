
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
    let schema = { type: this.value, options: this.options, x: 10, y: 20 };
    // (new IdBuilder(schema)).build();
    let builder = new PositionBuilder(schema);
    let ref = drawReference(this.value);


    this.innerHTML = `
      <div>HHH
        <div>${this.value}</div>
        <svg preserveAspectRatio='xMinYMin slice' width="${ref.width + 40}" height="${ref.height + 20}">
            <g stroke="black">
              <line x1=-100 y1=20 x2=100 y2=20 stroke="red" />
              <line x1=10 y1=-100 x2=10 y2=100 stroke="red" />
                ${builder.build()}
            </g>
        </svg>
      </div>
    `;
  }
}

customElements.define('x-legend', Legend);
