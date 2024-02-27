
class InstallationFiliaire extends InstallationAbstractSVG {
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
}

customElements.define('installation-filiaire', InstallationFiliaire);
