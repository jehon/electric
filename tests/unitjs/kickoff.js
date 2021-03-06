
function clickTo(element, selector = false) {
  var ev = document.createEvent("MouseEvent");
  ev.initMouseEvent(
          "click",
          true /* bubble */, true /* cancelable */,
          window, null,
          0, 0, 0, 0, /* coordinates */
          false, false, false, false, /* modifier keys */
          0 /*left*/, null
  );
  if (selector === false) {
    element.dispatchEvent(ev);
  } else {
    element.querySelector(selector).dispatchEvent(ev);
  }
}

function loadMock(mock, type) {
  var rootMock = "/base/tests/20_js/mocks/";
  return myFetch(rootMock + mock)
    .then(function(data) {
      if (type) {
        data = appState().helpers.create(type, appState().helpers.objectify(data));
      }
      return data;
    });
}

function webDescribe(title, html, fn) {
  return describe(title, function() {
    let div;
    let element;
    let oldTimeout;

    beforeEach(function(done) {
      // Set an acceptable timeout
      oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

      // Build up the element

      // - The real component

      div = document.createElement("div");
      div.style="border: red solid 1px; min-height: 10px"
      div.innerHTML = html.trim();

      // - Add the title for completeness
      let h3 = document.createElement("h3");
      h3.innerHTML = title;
      div.appendChild(h3);

      // - Dump code for info
      let pre = document.createElement("pre");
      pre.innerHTML = html.split("<").join("&lt;").split(">").join("&gt");
      div.appendChild(pre);

      // Add some styling
      let style = document.createElement("style");
      style.innerHTML = `
        pre {
          background-color: yellow;
        }
      `
      div.appendChild(style);

      document.body.appendChild(div);
      
      let check = function(el) {
        if (el instanceof HTMLUnknownElement) {
          return el.tagName;
        }
        for(let i in el.children) {
          let res = check(el.children[i]);
          if (res !== true) {
            return res;
          }
        }
        return true;
      }

      let i = 40;
      let interval = setInterval(() => {
        if (i-- <= 0) {
          // console.log("too much tests", div.firstChild);
          clearInterval(interval);
          done.fail("testComponent: component could not be instanciated ", html);
          return;
        }

        // Do we have a first child?
        if (!div.firstChild) {
          // console.log("no first child");
          return ;
        }

        // Check all object for HTMLUnknownElements
        if (!check(div.firstChild)) {
          // console.log("checking child nodes does not work");
          return;
        }

        // Happy case
        clearInterval(interval);
        element = div.firstChild;
        done();
      }, 100);
    });

    afterEach(function() {
      // Register removing it afterwards
      document.body.removeChild(div);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
    });

    it("should initialize the object correctly", function() {
      expect(element).not.toBeUndefined();     
      expect(element).not.toBeNull();     
    })

    // We need to pass it as a function, because as we start this function
    // element is not already defined
    fn(() => element);
  });
}


webDescribe("webDescribe.js", "<div></div>", function(element) {
  it("should work", function() {
    expect(element()).not.toBe(null);
    expect(element().tagName).toBe("DIV");
  })
})
