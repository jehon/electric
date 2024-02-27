
(function() {
  class InstallationNavigation extends InstallationAbstract {
    render() {
        if (!this.value) {
            this.value = "filiaire";
        }

        // navbar-dark bg-dark
        let res = `
          <ul class="nav nav-fill nav-tabs ">
            <li class="nav-item" id='filiaire'>
              <a class="nav-link">Filiaire</a>
            </li>
        `;

        Object.keys(this.installation.plans).forEach(k => {
          res += `
            <li class="nav-item" id='${k}'>
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
          let id = e.getAttribute('id');
          e.addEventListener("click", (event) => {
            this.select(id);
          })
        });
        if (this.value) {
          this.select(this.value);
        }
    }

    select(val) {
      this.value = val;
      this.querySelectorAll(`li:not(#${val})`).forEach(e => e.className = e.className.replace("active", ""));
      this.querySelectorAll(`li#${val}`).forEach(e => e.className += " active");

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
    }

    getPlan() {
      return this.value;
    }
  }

  customElements.define('installation-navigation', InstallationNavigation);

})();
