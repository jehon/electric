
describe("IdBuilderTest.js", function() {
	it("should refresh the data when data is modified", function() {
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		let cb = new IdBuilder(schema);
		cb.build();

		expect(IdBuilder.nextUUID()).toBe(9);
		expect(schema.next[0].type).toBe('P');
		expect(schema.next[0].getId()).toBe(7);

		expect(schema.next[0].next[0].type).toBe('S');
		expect(schema.next[0].next[0].getId()).toBe(6);

		expect(cb.findByUUID(7).type).toBe('P');
		expect(cb.findByUUID(6).type).toBe('S');
	});
});
