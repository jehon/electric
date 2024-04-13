import { currentElementDispatcher } from "../helpers/start.js";
import InstallationAbstract from "./InstallationAbstract.js";

// TODO: x.y by click
// TODO: change orientation
// TODO: change filiaire
// TODO: show accordeon according to scope

const listener = Symbol("listener");

export default class ElementEditor extends InstallationAbstract {
  connectedCallback() {
    super.connectedCallback();
    this[listener] = currentElementDispatcher.add((cu) => {
      this.currentElement = cu;
      this.adapt();
    });
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this[listener]) {
      this[listener]();
    }
    this[listener] = false;
  }

  render() {
    this.innerHTML = `
        <form>
          <div class="card border-light">

            <div class="card-header" role="tab" id="headingType">
              <h5 class="mb-0"><a>Infos</a></h5>
            </div>
            <div class="card-body">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Nom</label>
                  <div class="col-sm-10" style='display: flex'>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" name='auto_name' type="checkbox">Auto
                      </label>
                    </div>
                    <input type="name" class="form-control" name='name' placeholder="Nom">
                  </div>
                </div>
              </div>
            </div>

            <div class="card-header" role="tab" id="headingOne">
              <h5 class="mb-0"><a>Position</a></h5>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Plan</label>
                <div class="col-sm-10">
                  <select class="form-control" name='plan'></select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2"></label>
                <div class="form-group col-sm-10" style='display: flex'>
                  <label class='form-check-label' for='plan_x'>X: </label><input class="form-control" size='4' width='10' name='plan_x' placeholder='X'></select>
                  <label class='form-check-label' for='plan_y'>Y: </label><input class="form-control" size='4' width='10' name='plan_y' placeholder='Y'></select>
                </div>
              </div>
            </div>

          </div>
        </form>
      `;

    // <div class="form-group row">
    //   <div class="col-sm-10">
    //     <button type="submit" class="btn btn-primary">Sign in</button>
    //   </div>
    // </div>

    this.querySelector("[name='auto_name']").addEventListener("click", () => {
      if (this.querySelector("[name='auto_name']").checked) {
        this.querySelector("[name='name']").setAttribute("hidden", 1);
      } else {
        this.querySelector("[name='name']").removeAttribute("hidden");
      }
      this.nameChanged();
    });

    this.querySelector("[name='name']").addEventListener("change", () =>
      this.nameChanged()
    );

    this.querySelector("[name='plan']").addEventListener("change", () =>
      this.planChanged()
    );
    this.querySelectorAll("[name^='plan_']").forEach((el) =>
      el.addEventListener("change", () => this.positionChanged())
    );
  }

  adapt() {
    if (!this.installation) {
      this.setAttribute("hidden", true);
      return;
    }

    if (!this.currentElement) {
      // TESTING
      this.currentElement = findByUUID(14);
    }

    if (!this.currentElement) {
      this.setAttribute("hidden", true);
      return;
    }
    this.removeAttribute("hidden");

    // Name
    if ("name" in this.currentElement) {
      this.querySelector("[name='name']").value = this.currentElement.name;
      this.querySelector("[name='name']").removeAttribute("hidden");
      this.querySelector("[name='auto_name']").checked = false;
    } else {
      this.querySelector("[name='name']").value = this.currentElement.getName();
      this.querySelector("[name='name']").setAttribute("hidden", true);
      this.querySelector("[name='auto_name']").checked = true;
    }

    // Positions
    this.querySelector("[name='plan']").innerHTML =
      '<option value="">Seulement dans le coffret</option>';
    Object.keys(this.installation.plans).forEach((p) => {
      let opt = document.createElement("option");
      opt.value = p;
      opt.innerHTML = p;
      this.querySelector("[name='plan']").appendChild(opt);
    });
    this.positionAdapt();

    // setTimeout(() => {
    //   document.querySelector(`#_${this.currentElement.getId()}[electrical-type]`).scrollIntoView();
    // });
  }

  nameChanged() {
    let auto = this.querySelector("[name='auto_name']").checked;
    let name = this.querySelector("[name='name']").value;
    if (auto) {
      delete this.currentElement.name;
    } else {
      this.currentElement.name = name;
    }
    this.getMainElement().redrawElement(this.currentElement.getId());
  }

  planChanged() {
    let plan = this.querySelector("[name='plan']").value;
    if (plan) {
      this.currentElement.plan = plan;
    } else {
      delete this.currentElement.plan;
    }

    this.positionAdapt();

    if (plan) {
      document.querySelector("installation-navigation").select(plan);
    } else {
      // We redraw, to remove or to move the element
      // We don't select the new element
      this.getMainElement().redrawElement(this.currentElement.getId());
    }
  }

  positionChanged() {
    this.currentElement.x = this.querySelector("input[name='plan_x']").value;
    this.currentElement.y = this.querySelector("input[name='plan_y']").value;

    this.getMainElement().redrawElement(this.currentElement.getId());
  }

  positionAdapt() {
    if (this.currentElement.plan) {
      this.querySelector("[name='plan']").value = this.currentElement.plan;
      this.querySelectorAll("[name^='plan_']").forEach((el) =>
        el.removeAttribute("disabled")
      );
      this.querySelector("[name='plan']").value = "";
      this.querySelector("[name='plan_x']").value = this.currentElement.x;
      this.querySelector("[name='plan_y']").value = this.currentElement.y;
    } else {
      this.querySelectorAll("[name^='plan_']").forEach((el) =>
        el.setAttribute("disabled", true)
      );
    }
  }

  getMainElement() {
    return document.querySelector(
      "installation-filiaire, installation-position"
    );
  }
}

customElements.define("element-editor", ElementEditor);
