
(function() {
  class InstallationNavigation extends InstallationAbstract {
    render() {
        if (!this.value) {
          this.value = document.location.hash.substring(1);
        }
        
        if (!this.value) {
            this.value = "filiaire";
        }

        // navbar-dark bg-dark
        let res = `
          <ul class="nav nav-fill nav-tabs ">
            <li class="nav-item" element='filiaire'>
              <a class="nav-link">Filiaire</a>
            </li>
        `;

        Object.keys(this.installation.plans).forEach(k => {
          res += `
            <li class="nav-item" element='${k}'>
              <a class="nav-link">${k}</a>
            </li>
        `});

        // res += ` 
        //     <li class="nav-item">
        //       <a class="nav-link" href="javascript:console.log('active2')">Légende</a>
        //     </li>
        // `;

        res += ` 
          </ul>
        `;

        this.innerHTML = res;

        // this.querySelector(`#${this.value}`).className += " active";
        this.querySelectorAll('li').forEach(e => {
          let element = e.getAttribute('element');
          e.addEventListener("click", (event) => {
            this.select(element);
          })
        });
        if (this.value) {
          this.select(this.value);
        }
    }

    select(val) {
      this.value = val;
      this.querySelectorAll(`li:not([element=${val}])`).forEach(e => e.className = e.className.replace("active", ""));
      this.querySelectorAll(`li[element=${val}]`).forEach(e => e.className += " active");

      let el = document.querySelector("#tab_target");
      if (el == null) {
        // console.warn("#tab_target not found. Doing nothing...");
        return;
      }

      let html = '';
      switch(val) {
        case 'filiaire': 
          html += `<installation-filiaire></installation-filiaire>`;
          break;
        default:
          html += `<installation-position value='${val}'></installation-position>`;
      }
      el.innerHTML = html;
      document.location.hash = val;
    }

    getPlan() {
      return this.value;
    }
  }

  customElements.define('installation-navigation', InstallationNavigation);

})();
