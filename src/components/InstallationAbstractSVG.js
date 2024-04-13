import jsPDF from "jspdf";
import InstallationAbstract from "./InstallationAbstract.js";

export default class InstallationAbstractSVG extends InstallationAbstract {
  constructor() {
    super();
    this.builder = false;
    this.value = "";
  }

  getCachedBuilder() {
    if (this.builder === false) {
      this.builder = this.getBuilderForInstallation();
    }
    return this.builder;
  }

  getBuilderForInstallation() {
    return new BuildName(this.installation.schema);
  }

  empty() {
    super.empty();
    this.builder = false;
  }

  getSVG() {
    return { svg: "", width: 10, height: 10 };
  }

  getSVGTag() {
    let res = this.getSVG();

    const strictSVG = res.svg
      .replaceAll(/\r/g, "")
      .replaceAll(/\n/g, "")
      .replaceAll(/\t/g, "")
      .replaceAll(/> +</g, "><")
      .trim();

    return `<svg
        preserveAspectRatio="xMinYMin slice"
        stroke='black'
        fill='none'
        width='${res.width}'
        height='${res.height}'
      >
        ${strictSVG}
      </svg>
    `;
  }

  getTitle() {
    return "Schéma";
  }

  render() {
    this.getCachedBuilder().build();

    this.innerHTML = `
        <button id="print">print</button>
        <div style='height: 100%; width: 100%'>
		  	  <h3>${this.getTitle()}</h3>
          ${this.getSVGTag()}
          </div>
	    `;

    this.querySelector("svg").addEventListener("click", (event) => {
      var rect = event.target.getBoundingClientRect();
      var x = Math.round(event.clientX - rect.left); //x position within the element.
      var y = Math.round(event.clientY - rect.top); //y position within the element.
    });

    this.querySelectorAll("[electrical-type]").forEach((e) =>
      e.addEventListener("click", (event) => {
        let targetId = event.target.closest("[electrical-type]").id;
        let el = findByUUID(targetId);
        currentElementDispatcher.setState(el);
      })
    );

    this.querySelector("#print").addEventListener("click", () => {
      this.print();
    });

    this.selectElement();
  }

  selectElement() {
    if (!this.currentElement || !this.currentElement.getId) {
      // Protect agains strange situations
      return;
    }

    this.querySelectorAll(`[electrical-type]`).forEach((el) => {
      el.classList.toggle(
        "highlighted",
        el.id == "_" + this.currentElement.getId()
      );
    });
  }

  redrawElement(i) {
    // replacedNode = parentNode.replaceChild(newChild, oldChild);
    this.render();
  }

  async print() {
    // https://github.com/parallax/jsPDF/blob/master/examples/canvg_context2d/bar_graph_with_text_and_lines.html
    // var c = pdf.canvas;
    // c.width = 1000;
    // c.height = 500;

    // var ctx = c.getContext("2d");
    // ctx.ignoreClearRect = true;
    // ctx.fillStyle = "#ffff00";
    // ctx.fillRect(0, 0, 1000, 700);

    // //load a svg snippet in the canvas with id = 'drawingArea'
    // const v = await Canvg.Canvg.from(
    //   ctx,
    //   document.querySelector("svg").outerHTML
    //   // Canvg.presets.offscreen()
    // );
    // await v.render();

    // var canvas = document.createElement("canvas");
    // // const c = new Canvg.Canvg(canvas, svg);
    // var imgData = canvas.toDataURL("image/png");
    // console.log(imgData);
    // pdf.addImage(imgData, "PNG", 40, 40, 750, 750);

    // Default export is a4 paper, portrait, using millimeters for units
    const pdf = new jsPDF({
      orientation: "landscape"
    });

    pdf.text(this.getTitle(), 10, 10);

    await pdf.addSvgAsImage(this.getSVGTag(), 20, 20, 100, 100);

    // Open a save-as window
    pdf.save(this.getTitle() + ".pdf");
  }
}

customElements.define("installation-abstract-svg", InstallationAbstractSVG);
