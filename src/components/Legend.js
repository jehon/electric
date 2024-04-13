import DrawReference from "../class/DrawReference";

export default class Legend extends HTMLElement {
  constructor() {
    super();
    this.value = "P";
    this.options = {};
  }

  static get observedAttributes() {
    return ["value", "options"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    switch (attributeName) {
      case "value":
        this.value = this.getAttribute("value");
        this.render();
        break;
      case "options":
        this.options = JSON.parse(this.getAttribute("options"));
        this.render();
        break;
    }
  }

  render() {
    const X0 = 10;
    const Y0 = 20;
    let schema = Object.assign(
      { type: this.value, x: X0, y: Y0, plan: "legend" },
      this.options,
    );
    new BuildSingleElement(schema).build();
    // (new BuildName(schema)).build();
    let builder = new BuildPosition(schema);

    this.innerHTML = `
        <div class="row">
            <div class="col-md-1">${this.value}</div>
            <div class="col-md-2">${JSON.stringify(this.options)}</div>
            <div class="col-md-1">
                <svg preserveAspectRatio='xMinYMin slice' width="${schema.getVal("width") + 40}" height="${schema.getVal("height") + 30}">
                    <g stroke="red">
                      <line x1=-100 y1=20 x2=100 y2=20 />
                      <line x1=10 y1=-100 x2=10 y2=100 />
                      <rect x="${X0}" y="${Y0 - schema.getVal("toTop")}" width="${schema.getVal("width")}" height="${schema.getVal("height")}" fill="none"/>
                      <g stroke="black">
                        ${builder.build("legend")}
                      </g>
                    </g>
                </svg>
            </div>
            <div class="col-md-8">
              <pre>${JSON.stringify(DrawReference(this.value), null, 2)}</pre>
            </div>
        </div>
    `;
  }
}

customElements.define("x-legend", Legend);
