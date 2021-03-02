
webDescribe("InstallationAbstractTest.js", "<installation-abstract></installation-abstract>", function(element) {
	beforeEach(function() {
		installationDispatcher.setState(false);
	});

	it("should load", function() {
		expect(element().tagName.toLowerCase()).toBe("installation-abstract");
	});

	it("should contain -empty- at startup", function() {
		expect(element().innerHTML).toContain("-empty-");
	});

	describe("with initialized installation", function() {
		beforeEach(function() {
			installationDispatcher.setState(mockSimpleCircuit());
		});

		it("should contain -full- when starting with an initialized installation", function() {
			expect(element().innerHTML).toContain("-full-");
		});		
	});

	it("should react to installation setState", function() {
		installationDispatcher.setState(mockSimpleCircuit());
		expect(element().innerHTML).toContain("-full-");
	});

	describe("look for callbacks", function() {
		beforeEach(function() {
			spyOn(element(), "selectElement").and.callThrough();
			spyOn(element(), "installationChanged").and.callThrough();
		})

		it("should react to current installation changed", function() {
			expect(element().installationChanged).toHaveBeenCalledTimes(0);
			
			installationDispatcher.setState(mockSimpleCircuit());
			expect(element().installationChanged).toHaveBeenCalledTimes(1);

			installationDispatcher.setState(false);
			expect(element().installationChanged).toHaveBeenCalledTimes(2);
			expect(element().installationChanged.calls.argsFor(1)[0]).toBeFalsy();

			expect(element().selectElement).toHaveBeenCalledTimes(0);
		})
	
		it("should react to current element changed", function() {
			expect(element().selectElement).toHaveBeenCalledTimes(0);
			
			currentElementDispatcher.setState(123);
			expect(element().selectElement).toHaveBeenCalledTimes(1);
			expect(element().selectElement.calls.argsFor(0)[0]).toBe(123);

			currentElementDispatcher.setState(false);
			expect(element().selectElement).toHaveBeenCalledTimes(2);
			expect(element().selectElement.calls.argsFor(1)[0]).toBeFalsy();

			expect(element().installationChanged).toHaveBeenCalledTimes(0);
		});

		it("should stop watching when disconnected", function() {
			let el = element();
			el.disconnectedCallback();

			currentElementDispatcher.setState(456);
			expect(element().selectElement).toHaveBeenCalledTimes(0);
			expect(element().installationChanged).toHaveBeenCalledTimes(0);

			installationDispatcher.setState(mockSimpleCircuit());
			expect(element().selectElement).toHaveBeenCalledTimes(0);
			expect(element().installationChanged).toHaveBeenCalledTimes(0);
		});
	});
})