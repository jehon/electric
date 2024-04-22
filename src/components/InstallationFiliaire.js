import BuildFiliaire from "../class/BuildFiliaire.js";
import InstallationAbstractSVG from "./InstallationAbstractSVG.js";

export default class InstallationFiliaire extends InstallationAbstractSVG {
  constructor() {
    super();
    this.value = "filiaire";
  }

  getBuilderForInstallation() {
    return new BuildFiliaire(this.installation.schema);
  }

  async getSVG() {
    return await this.getBuilderForInstallation(this.installation).build();
  }

  getTitle() {
    return "Schéma Filiaire";
  }
}

customElements.define("installation-filiaire", InstallationFiliaire);
