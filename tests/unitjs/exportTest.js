
describe("exporting to json", function() {
	it("should export simpleCircuit", function() {
		BuildSingleElement.testResetUUID();
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();

		(new BuildSingleElement(schema.schema)).build();

		// Use the idFinderbuilder
		expect(findByUUID(2, schema.schema).type).toBe('P');

		// The export must not change !
		expect(JSON.stringify(schema)).toEqual(mockSimpleCircuitJSON);

		// Use other builders
		// TODO: build other to see if they have an impact

		// The export must not change !
		expect(JSON.stringify(schema)).toEqual(mockSimpleCircuitJSON);
	});
})