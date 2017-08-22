
describe("BuilderTest.js", function() {
	let i;

	let resetCounters = function() {
		i = { 
			next: 0,
			alt: 0,
			assembly: 0,
			self: 0
		};
	};
	resetCounters();

	class MockBuilder extends Builder {
		getOneNext(...args) {
			i.next++;
			return super.getOneNext(...args);
		}

		getOneAlternate(...args) {
			i.alt++;
			return super.getOneAlternate(...args);
		}

		buildSelf(...args) {
			i.self++;
			return super.buildSelf(...args);
		}

		buildAssembly(...args) {
			i.assembly++;
			return super.buildAssembly(...args);
		}
	}

	it("should parse a simple object with a MockBuilder", function() {
		resetCounters();

		//let schema = mockSimpleCircuit();
		//expect(schema).not.toBeNull();
		let schema = new Disj();
		schema.next.push(new P());
		schema.alternate.push(new S());

		schema.next[0].next.push(new Disj());

		let cb = new MockBuilder(schema);

		cb.build();
		expect(i.self).toBe(4);
		expect(i.next).toBe(2);
		expect(i.alt).toBe(1);
		expect(i.assembly).toBe(4);
	});


	it("should parse the simpleCircuit mock  with a MockBuilder", function() {
		resetCounters();

		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		let cb = new MockBuilder(schema);

		cb.build();
		expect(i.self).toBe(8);
		expect(i.next).toBe(4);
		expect(i.alt).toBe(3);
		expect(i.assembly).toBe(8);
	});
});
