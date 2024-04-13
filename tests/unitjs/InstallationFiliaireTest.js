webDescribe(
  "InstallationFiliaireTest.js",
  "<installation-filiaire></installation-filiaire>",
  function (element) {
    beforeEach(function () {
      installationDispatcher.setState(false);
      currentElementDispatcher.setState(false);
      BuildSingleElement.testResetUUID();
    });

    it("should load", function () {
      expect(element().tagName.toLowerCase()).toBe("installation-filiaire");
    });

    it("should contain -empty- at startup", function () {
      expect(element().innerHTML).toContain("-empty-");
    });

    describe("with initialized installation", function () {
      beforeEach(function () {
        let installation = mockSimpleCircuit();
        new BuildSingleElement(installation.schema).build();
        installationDispatcher.setState(installation);
      });

      it("should not contain -empty- when starting with an initialized installation", function () {
        expect(element().innerHTML).not.toContain("-empty-");
        expect(element().innerHTML).toContain("<svg");
        expect(element().innerHTML).toContain(`<g electrical-type="S"`);
      });

      describe("with current element", function () {
        it("should react to the currently selected element", function () {
          let el = findByUUID(2);
          expect(el).not.toBeNull();

          currentElementDispatcher.setState(el);

          expect(element().querySelector("#_2.highlighted")).not.toBeNull();
          expect(element().querySelectorAll(".highlighted").length).toBe(1);
        });
      });
    });
  }
);
