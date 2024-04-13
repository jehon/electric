webDescribe(
  "InstallationPositionTest.js",
  "<installation-position></installation-position>",
  function (element) {
    beforeEach(function () {
      installationDispatcher.setState(false);
      currentElementDispatcher.setState(false);
      BuildSingleElement.testResetUUID();
    });

    it("should load", function () {
      expect(element().tagName.toLowerCase()).toBe("installation-position");
    });

    it("should contain -empty- at startup", function () {
      expect(element().innerHTML).toContain("-empty-");
    });

    describe("with initialized installation", function () {
      beforeEach(function (done) {
        let installation = mockSimpleCircuit();
        new BuildSingleElement(installation.schema).build();
        installationDispatcher.setState(installation);

        element().setAttribute("value", "cave");

        expect(findByUUID(2).plan).toBe("cave");
        expect(findByUUID(3).plan).toBe("rdc");
        setTimeout(() => done());
      });

      it("should not contain -empty- when starting with an initialized installation", function () {
        expect(element().innerHTML).not.toContain("-empty-");
        expect(element().innerHTML).toContain("<svg");

        expect(element().querySelector("#_1")).toBeNull();
        expect(element().querySelector("#_2")).not.toBeNull();
        expect(element().querySelector("#_3")).toBeNull();
      });

      describe("with current element", function () {
        beforeEach(function () {
          spyOn(element(), "selectElement").and.callThrough();
        });

        it("should react to the currently selected element", function () {
          let el = findByUUID(2);

          expect(element().selectElement).toHaveBeenCalledTimes(0);

          currentElementDispatcher.setState(el);

          expect(element().selectElement).toHaveBeenCalledTimes(1);

          expect(element().querySelectorAll(".highlighted").length).toBe(1);
          expect(element().querySelector("#_2.highlighted")).not.toBeNull();
        });
      });
    });
  }
);
