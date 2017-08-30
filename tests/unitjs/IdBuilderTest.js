
describe("IdBuilderTest.js", function() {
	it("should refresh the data when data is modified", function() {
		IdBuilder.testResetUUID();
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		let cb = new IdBuilder(schema);
		cb.build();

		expect(IdBuilder.nextUUID()).toBe(9);
		expect(schema.next[0].type).toBe('P');
		expect(schema.next[0].getId()).toBe(2);
		expect(schema.next[0].getType().type).toBe('P');

		expect(schema.next[0].next[0].type).toBe('S');
		expect(schema.next[0].next[0].getId()).toBe(3);
		expect(schema.next[0].next[0].getType().type).toBe('S');

		expect(cb.findByUUID(2).type).toBe('P');
		expect(cb.findByUUID(3).type).toBe('S');
	});
});
