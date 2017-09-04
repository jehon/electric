
describe("IdFinderBuilderTest.js", function() {
	it("should refresh the data when data is modified", function() {
		IdBuilder.testResetUUID();
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		let cb = new IdBuilder(schema);
		cb.build();

		let cbf = new IdFinderBuilder(schema);

		expect(schema.next[0].type).toBe('P');
		expect(schema.next[0].getId()).toBe(2);

		expect(schema.next[0].next[0].type).toBe('S');
		expect(schema.next[0].next[0].getId()).toBe(3);

		expect(cbf.findByUUID(2).type).toBe('P');
		expect(cbf.findByUUID(3).type).toBe('S');
	});
});
