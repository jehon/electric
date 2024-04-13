import BuildPosition from "../class/BuildPosition.js";
import InstallationAbstractSVG from "./InstallationAbstractSVG.js";

export default class InstallationPosition extends InstallationAbstractSVG {
  getBuilderForInstallation() {
    return new BuildPosition(this.installation.schema);
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    switch (attributeName) {
      case "value":
        this.value = newValue;
        break;
    }
    if (this.installation) {
      this.render();
    }
  }

  getTitle() {
    return "Plan: " + this.value;
  }

  getSVG() {
    if (!this.value) {
      this.empty();
      return Promise.reject("No value in installation-position.getSVG()");
    }

    if (!(this.value in this.installation.plans)) {
      this.empty();
      return Promise.reject(
        "Plan is unknown: ",
        this.value,
        " in ",
        Object.keys(this.installation.plans),
        " in installation-position.getSVG()"
      );
    }

    let plan = this.installation.plans[this.value];
    return {
      width: plan.width,
      height: plan.height,
      svg: `
            <image opacity="0.5" x="0" y="0" width="${plan.width}px" height="${plan.height}px" href="${plan.src}" />
            ${this.getCachedBuilder().build("" + this.value)}
      `
    };
  }
}

customElements.define("installation-position", InstallationPosition);
