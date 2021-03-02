
describe("BuildMigrationTest.js", function() {
	it("should build correct names", function() {
		let schema = mockSimpleCircuit().schema;
		expect(schema).not.toBeNull();
		let cb = new BuildMigration(schema);
		cb.build();
	});
});
