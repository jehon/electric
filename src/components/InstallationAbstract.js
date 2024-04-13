import {
  currentElementDispatcher,
  installationDispatcher
} from "../helpers/start.js";

const callbackInstallation = Symbol("callbackInstallation");
const callbackElement = Symbol("callbackElement");

export default class InstallationAbstract extends HTMLElement {
  constructor() {
    super();
    this.installation = false;
    this.currentElement = false;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.empty();
    this[callbackInstallation] = installationDispatcher.add((installation) =>
      this.installationChanged(installation)
    );
    this[callbackElement] = currentElementDispatcher.add((element) =>
      this.currentElementChanged(element)
    );
  }

  installationChanged(installation) {
    this.installation = installation;
    if (installation) {
      this.render();
    } else {
      this.empty();
    }
  }

  currentElementChanged(element) {
    this.currentElement = element;
    this.selectElement(this.currentElement);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    if (this[callbackInstallation]) {
      this[callbackInstallation]();
    }
    this[callbackInstallation] = false;

    if (this[callbackElement]) {
      this[callbackElement]();
    }
    this[callbackElement] = false;
  }

  empty() {
    this.innerHTML = "-empty-";
  }

  render() {
    this.innerHTML = "-full-";
  }

  selectElement(currentElement) {}
}

customElements.define("installation-abstract", InstallationAbstract);
