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

  getTitle() {
    return "Schéma";
  }

  render() {
    this.getCachedBuilder().build();

    let res = this.getSVG();

    this.innerHTML = `
        <button id="print">print</button>
        <div style='height: 100%; width: 100%'>
		  	  <h3>${this.getTitle()}</h3>
	        <svg 
            preserveAspectRatio="xMinYMin slice" 
            stroke='black'
            fill='none'
            width=${res.width}
            height=${res.height}
          >
	          ${res.svg}
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

  redrawElement(i) {
    // replacedNode = parentNode.replaceChild(newChild, oldChild);
    this.render();
  }

  async print() {
    // Default export is a4 paper, portrait, using millimeters for units
    const pdf = new window.jspdf.jsPDF({
      orientation: "landscape",
    });

    pdf.text(this.getTitle(), 10, 10);
    // Open a save-as window
    pdf.save(this.getTitle() + ".pdf");
  }
}

customElements.define("installation-abstract-svg", InstallationAbstractSVG);
