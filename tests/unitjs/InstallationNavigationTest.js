webDescribe(
  "InstallationNavigationTest.js",
  "<installation-navigation></installation-navigation>",
  function (element) {
    webDescribe(
      "with a target",
      "<div id='tab_target'></div>",
      function (tab_target) {
        beforeEach(function () {
          installationDispatcher.setState(false);
          currentElementDispatcher.setState(false);
        });

        it("should load", function () {
          expect(element().tagName.toLowerCase()).toBe(
            "installation-navigation"
          );
        });

        it("should contain -empty- at startup", function () {
          expect(element().innerHTML).toContain("-empty-");
        });

        describe("with initialized installation", function () {
          beforeEach(function (done) {
            installationDispatcher.setState(mockSimpleCircuit());
            setTimeout(() => {
              // render is asynchronous
              done();
            });
          });

          it("should not contain -empty- when starting with an initialized installation", function () {
            expect(element().innerHTML).not.toContain("-empty-");
            expect(element().innerHTML).toContain("<ul");
          });

          it("should contain a 'filiaire' menu", function () {
            expect(element().querySelector("#filiaire")).not.toBeNull();
          });

          it("should contain a plan tab", function () {
            expect(element().querySelector("#cave")).not.toBeNull();
            expect(element().querySelector("#rdc")).not.toBeNull();
          });

          it("shoud select by click on plan", function () {
            clickTo(element().querySelector("#cave"));
            expect(element().querySelectorAll(".active").length).toBe(1);
            expect(element().querySelectorAll("#cave.active").length).toBe(1);
            expect(
              tab_target().querySelectorAll("installation-filiaire").length
            ).toBe(0);
            expect(
              tab_target().querySelectorAll("installation-position").length
            ).toBe(1);
          });

          it("shoud select by click on plan", function () {
            clickTo(element().querySelector("#filiaire"));
            expect(element().querySelectorAll(".active").length).toBe(1);
            expect(element().querySelectorAll("#filiaire.active").length).toBe(
              1
            );
            expect(
              tab_target().querySelectorAll("installation-filiaire").length
            ).toBe(1);
            expect(
              tab_target().querySelectorAll("installation-position").length
            ).toBe(0);
          });

          it("should select also by api/select() ", function () {
            element().select("cave");
            expect(element().querySelectorAll(".active").length).toBe(1);
            expect(element().querySelectorAll("#cave.active").length).toBe(1);
            expect(
              tab_target().querySelectorAll("installation-filiaire").length
            ).toBe(0);
            expect(
              tab_target().querySelectorAll("installation-position").length
            ).toBe(1);
          });
        });
      }
    );
  }
);
