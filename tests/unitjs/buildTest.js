

describe("parsing the json", function() {
	it("should parse object simpleCircuit", function() {
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		expect(schema).toEqual(jasmine.any(Disj));
		expect(schema.next[0]).toEqual(jasmine.any(P));
		expect(schema.next[0].next[0]).toEqual(jasmine.any(S));
		expect(schema.next[0].next[0].alternate[0]).toEqual(jasmine.any(S));
	});
})