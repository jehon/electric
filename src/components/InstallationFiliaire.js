import InstallationAbstractSVG from "./InstallationAbstractSVG.js";
import BuildFiliaire from "../class/BuildFiliaire.js";

export default class InstallationFiliaire extends InstallationAbstractSVG {
  constructor() {
    super();
    this.value = "filiaire";
  }

  getBuilderForInstallation() {
    return new BuildFiliaire(this.installation.schema);
  }

  getSVG() {
    return this.getBuilderForInstallation(this.installation).build();
  }

  getTitle() {
    return "Schéma Filiaire";
  }
}

customElements.define("installation-filiaire", InstallationFiliaire);
