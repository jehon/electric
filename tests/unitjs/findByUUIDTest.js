
describe("findByUUIDTest.js", function() {
	it("should find back the uuid", function() {
		SingleElementBuilder.testResetUUID();
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();

		let cb = new SingleElementBuilder(schema);
		cb.build();

		expect(schema.next[0].type).toBe('P');
		expect(schema.next[0].getId()).toBe(2);

		expect(schema.next[0].next[0].type).toBe('S');
		expect(schema.next[0].next[0].getId()).toBe(3);

		expect(findByUUID(schema, 2).type).toBe('P');
		expect(findByUUID(schema, 3).type).toBe('S');
	});
});
