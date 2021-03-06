
describe("BuilderTest.js", function() {
	let i;

	let resetCounters = function() {
		i = { 
			desc: 0,
			assembly: 0,
			self: 0
		};
	};
	resetCounters();

	class MockBuilder extends Builder {
		buildSelf() {
			i.self++;
			return this._currentElement.type + "|";
		}

		getDescendantBuildParameters(...args) {
			i.desc++;
			return args;
		}

		buildAssembly(...args) {
			i.assembly++;
			return super.buildAssembly(...args);
		}
	}

	it("should parse the simpleCircuit mock  with a MockBuilder", function() {
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		let cb = new MockBuilder(schema);

		resetCounters();
		res = cb.build();
		expect(i.self).toBe(8);
		expect(i.desc).toBe(7);
		expect(i.assembly).toBe(8);

		// count the number of occurent in string (thanks to https://stackoverflow.com/a/4009768/1954789)
		expect(res.match(/Disj/g).length).toBe(1);
		expect(res.match(/P/g).length).toBe(2);
		expect(res.match(/S/g).length).toBe(3);
		expect(res.match(/Neon/g).length).toBe(2);
	});

	it("should refresh the data when data is modified", function() {
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		let cb = new MockBuilder(schema);

		schema.next[0].type = "HAHAHA";

		resetCounters();
		res = cb.build();
		expect(i.self).toBe(8);
		expect(i.desc).toBe(7);
		expect(i.assembly).toBe(8);
		expect(res).toContain("|HAHAHA|");

		// count the number of occurent in string (thanks to https://stackoverflow.com/a/4009768/1954789)
		// new elements
		expect(res.match(/HAHAHA/g).length).toBe(1);
		expect(res.match(/P/g).length).toBe(1);

		// conserved elements
		expect(res.match(/Disj/g).length).toBe(1);
		expect(res.match(/S/g).length).toBe(3);
		expect(res.match(/Neon/g).length).toBe(2);
	});
});
