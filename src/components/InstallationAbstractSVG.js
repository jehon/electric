import jsPDF from "jspdf";
import BuildName from "../class/BuildName.js";
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

  getStrictSVG() {
    let res = this.getSVG();

    return res.svg
      .replaceAll(/\r/g, "")
      .replaceAll(/\n/g, "")
      .replaceAll(/\t/g, "")
      .replaceAll(/> +</g, "><")
      .trim();
  }

  getTitle() {
    return "Schéma";
  }

  render() {
    this.getCachedBuilder().build();
    const data = this.getSVG();

    this.innerHTML = `
        <button id="print">print</button>
        <div style='height: 100%; width: 100%'>
		  	  <h3>${this.getTitle()}</h3>
          <svg
              width='${data.width}'
              height='${data.height}'
              stroke='black'
              fill='none'
            >
            ${this.getStrictSVG()}
          </svg>
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

  redrawElement(_i) {
    // replacedNode = parentNode.replaceChild(newChild, oldChild);
    this.render();
  }

  async print() {
    const pageMargin = 10;
    const data = this.getSVG();
    const orientationLandscape = data.width > data.height;

    // Default export is a4 paper, portrait, using millimeters for units
    const pdf = new jsPDF({
      orientation: orientationLandscape ? "landscape" : "portrait"
    });

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await pdf.addSvgAsImage(
      `<svg
          stroke='black'
          fill='none'
          width='${pdf.internal.pageSize.getWidth() - 2 * pageMargin}'
          height='${pdf.internal.pageSize.getHeight() - 2 * pageMargin}'
          viewBox='0 0 ${data.width} ${data.width}'
          preserveAspectRatio="xMinYMin slice"
        >
          ${this.getStrictSVG()}
      </svg>`,
      pageMargin,
      pageMargin,
      pdf.internal.pageSize.getWidth() - 2 * pageMargin,
      pdf.internal.pageSize.getHeight() - 2 * pageMargin
    );

    pdf.text(this.getTitle(), pageMargin, pageMargin);

    // Open a save-as window
    pdf.save(this.getTitle() + ".pdf");
  }
}

customElements.define("installation-abstract-svg", InstallationAbstractSVG);
