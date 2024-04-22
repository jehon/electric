import jsPDF from "jspdf";
import "svg2pdf.js";
import BuildName from "../class/BuildName.js";
import findByUUID from "../class/findByUUID.js";
import { currentElementDispatcher } from "../helpers/start.js";
import string2element from "../helpers/string2element.ts";
import InstallationAbstract from "./InstallationAbstract.js";

// Custom fonts
// TTF -> JS: https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html
import "../css/OpenSans-normal.js";

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

  getStrictSVG(svg) {
    return svg
      .replaceAll(/\r/g, "")
      .replaceAll(/\n/g, "")
      .replaceAll(/\t/g, "")
      .replaceAll(/> +</g, "><")
      .trim();
  }

  getTitle() {
    return "Schéma";
  }

  async render() {
    this.getCachedBuilder().build();
    const data = await this.getSVG();

    this.innerHTML = `
        <button id="print">print</button>
        <button id="download">download</button>
        <div style='height: 100%; width: 100%'>
		  	  <h3>${this.getTitle()}</h3>
          <svg
              width='${data.width}'
              height='${data.height}'
              stroke='black'
              fill='none'
            >
            ${this.getStrictSVG(data.svg)}
          </svg>
          </div>
	    `;

    this.querySelector("svg").addEventListener("click", (_event) => {
      // const rect = event.target.getBoundingClientRect();
      // const x = Math.round(event.clientX - rect.left); //x position within the element.
      // const y = Math.round(event.clientY - rect.top); //y position within the element.
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

    this.querySelector("#download").addEventListener("click", () => {
      this.download();
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
    const data = await this.getSVG();
    const orientationLandscape = data.width > data.height;

    // Default export is a4 paper, portrait, using millimeters for units
    const pdf = new jsPDF({
      orientation: orientationLandscape ? "landscape" : "portrait"
    });

    // See https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html
    // "https://fonts.gstatic.com/s/opensans/v40/memtYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWqWtE6F15M.woff2";

    // const font = "/src/css/OpenSans.ttf";

    // const fontStringBase64 = (
    //   await fetch(font)
    //     .then((res) => res.blob())
    //     .then(
    //       (blob) =>
    //         new Promise((resolve, _) => {
    //           const reader = new FileReader();
    //           reader.onloadend = () => resolve(reader.result);
    //           reader.readAsDataURL(blob);
    //         })
    //     )
    // ).replace("data:font/ttf;base64,", "");

    // console.log(fontStringBase64);

    // pdf.addFileToVFS("OpenSans.ttf", fontStringBase64);
    // pdf.addFont("OpenSans.ttf", "Open Sans", "normal");
    // pdf.setFont("Open Sans");

    pdf.setFont("Open Sans");

    const svgElem = string2element(
      `<svg
            stroke="black"
            fill="white"
            width="${pdf.internal.pageSize.getWidth() - 2 * pageMargin}"
            height="${pdf.internal.pageSize.getHeight() - 2 * pageMargin}"
            viewBox="0 0 ${data.width} ${data.height}"
            font="Open Sans"
            font-size="14"
          >
        ${this.getStrictSVG(data.svg)}
      </svg>`
    );

    await pdf.svg(svgElem, {
      x: 0,
      y: 0,
      width: pdf.internal.pageSize.width,
      height: pdf.internal.pageSize.height
    });

    pdf.setFont("Times");
    pdf.setFontSize(16);
    pdf.text(this.getTitle(), pageMargin, pageMargin);

    // Open a save-as window
    pdf.save(this.getTitle() + ".pdf");
  }

  async download() {
    const data = await this.getSVG(true);
    const svgElem = `<svg
            stroke="black"
            fill="white"
            width="${data.width}"
            height="${data.height}"
            font="Open Sans"
            font-size="8"
          >
          <style>
          @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i");
          </style>
        ${this.getStrictSVG(data.svg)}
      </svg>`;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(svgElem)
    );
    element.setAttribute("download", this.getTitle() + ".svg");

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

customElements.define("installation-abstract-svg", InstallationAbstractSVG);
