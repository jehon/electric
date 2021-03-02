
describe("dispatcherStateTest", function() {
	it("should start with initial state 'false'", function() {
		let sd = new StateDispatcher();
		expect(sd.getState()).toBe(false);
	});

	it("should store the first parameter of the constructor as the initial state", function() {
		let sd = new StateDispatcher(1);
		expect(sd.getState()).toBe(1);
	});

	it("should set and get the state", function() {
		let sd = new StateDispatcher();
		expect(sd.setState(1)).toEqual(jasmine.any(StateDispatcher));
		expect(sd.getState()).toBe(1);

		expect(() => sd.add(1)).toThrow("Could not add something else than functions !");
	});

	it("should throw when adding a non-function as listener", function() {
		let sd = new StateDispatcher();
		expect(() => sd.add(1)).toThrow("Could not add something else than functions !");
	});

	describe("with listeners", function() {
		let sd1 = new StateDispatcher(3);
		let i1 = 0;
		let unregister;

		it("should allow to add function as listener", function() {
			unregister = sd1.add(state => { i1 = state; });
		});

		it("should be fired with the initial state", function() {
			expect(i1).toBe(3);
		});


		it("should be fired when state is updated", function() {		
			sd1.setState(5);
			expect(i1).toBe(5);
		})

		it("should not be fired anymore when removed", function() {
			expect(typeof(unregister)).toBe("function");
			unregister();
			sd1.setState(10);
			expect(i1).toBe(5);			
		})

	});

	it("should be independant one from another", function() {
		let sd1 = new StateDispatcher(1);
		let sd2 = new StateDispatcher(2);

		expect(sd1.getState()).toBe(1);
		expect(sd2.getState()).toBe(2);

		let i1 = 0;
		let i2 = 0;
		let u1 = sd1.add(state => { i1 = state; });
		let u2 = sd2.add(state => { i2 = state; });

		expect(i1).toBe(1);
		expect(i2).toBe(2);

		sd1.setState(3);

		expect(i1).toBe(3);
		expect(i2).toBe(2);

		sd2.setState(4);

		expect(i1).toBe(3);
		expect(i2).toBe(4);
	});

	it("should stop the (old) firing cycle if one dispatcher fire a new state", function() {
		let sd1 = new StateDispatcher(0);
		let i1 = 0;
		let i2 = 0;
		let i1c = 0;
		let i2c = 0;
		let unregister;
		sd1.add(state => { 
			i1c++; 
			i1 = state; 
			// Modify the state in the "firing" cycle
			if (state == 10) { 
				sd1.setState(15);
			};
		});
		sd1.add(state => { 
			i2c++; 
			i2 = state; 
		});

		sd1.setState(10);

		expect(i1).toBe(15);
		expect(i2).toBe(15);
		// 3x: init / 10 -> setState(15) / 15
		expect(i1c).toBe(3);
		// Twice: once at initialization, once with 15
		expect(i2c).toBe(2);
	});
});