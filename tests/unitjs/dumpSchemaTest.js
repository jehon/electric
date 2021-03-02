
describe("dumpSchemaTest.js", function() {
	it("should build correct names when id are set", function() {
		BuildSingleElement.testResetUUID();
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		dumpSchema(schema);
	});
});
