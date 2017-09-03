
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
        this.options = JSON.parse(this.getAttribute("options"));
        this.render();
        break;
    }
  }

  render() {
    let schema = Object.assign({ type: this.value, x: 10, y: 20, plan: "legend" }, this.options);
    (new IdBuilder(schema)).build();
    let builder = new PositionBuilder(schema);
    let ref = drawReference(this.value);


    this.innerHTML = `
        <div class="row">
            <div class="col-md-1">${this.value}</div>
            <div class="col-md-2">${JSON.stringify(this.options)}</div>
            <div class="col-md-1">
                <svg preserveAspectRatio='xMinYMin slice' width="${ref.width + 40}" height="${ref.height + 20}">
                    <g stroke="black">
                      <line x1=-100 y1=20 x2=100 y2=20 stroke="red" />
                      <line x1=10 y1=-100 x2=10 y2=100 stroke="red" />
                      ${builder.build("legend")}
                    </g>
                </svg>
            </div>
            <div class="col-md-8">
              <pre>${JSON.stringify(drawReference(this.value), null, 2)}</pre>
            </div>
        </div>
    `;
  }
}

customElements.define('x-legend', Legend);
