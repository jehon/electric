
webDescribe("InstallationAbstractSVGTest.js", "<installation-abstract-svg></installation-abstract-svg>", function(element) {
	beforeEach(function() {
		installationDispatcher.setState(false);
		currentElementDispatcher.setState(false);
		BuildSingleElement.testResetUUID();
	});

	it("should load", function() {
		expect(element().tagName.toLowerCase()).toBe("installation-abstract-svg");
	});

	it("should contain -empty- at startup", function() {
		expect(element().innerHTML).toContain("-empty-");
	});

	describe("with initialized installation", function() {
		beforeEach(function(done) {
			installationDispatcher.setState(mockSimpleCircuit());
			setTimeout(() => {
				// render is asynchronous
				done();
			});
		});

		it("should not contain -empty- when starting with an initialized installation", function() {
			expect(element().innerHTML).not.toContain("-empty-");
			expect(element().innerHTML).toContain("<svg");
		});		
	});

	it("should react to installation setState", function() {
		installationDispatcher.setState(mockSimpleCircuit());
		setTimeout(() => {
			expect(element().innerHTML).not.toContain("-empty-");
			expect(element().innerHTML).toContain("<svg");
		});
	});

	describe("with current element", function() {
		beforeEach(function() {
			spyOn(element(), "selectElement");
		});

		it("should react to to the currently selected element", function() {
			BuildSingleElement.testResetUUID();

			let schema = mockSimpleCircuit();
			installationDispatcher.setState(schema);

			let el = findByUUID(2);

			currentElementDispatcher.setState(el);

			expect(element().selectElement).toHaveBeenCalledTimes(2);
		});
	})

})