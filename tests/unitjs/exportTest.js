
describe("exporting to json", function() {
	it("should export simpleCircuit", function() {
		IdBuilder.testResetUUID();
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();

		// Use the idFinderbuilder
		let cbf = new IdFinderBuilder(schema.schema);
		expect(cbf.findByUUID(2).type).toBe('P');

		// The export must not change !
		expect(JSON.stringify(schema)).toEqual(mockSimpleCircuitJSON);

		// Use other builders


		// The export must not change !
		expect(JSON.stringify(schema)).toEqual(mockSimpleCircuitJSON);
	});
})