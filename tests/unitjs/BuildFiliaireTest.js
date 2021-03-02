
describe("BuildFiliaireTest.js", function() {
	BuildSingleElement.testResetUUID();
	let schema = mockSimpleCircuit().schema;

	it("should build", function() {
		// BuildPosition.separator = ".";

		let pb = new BuildFiliaire(schema);

		let s = pb.build().svg;

		// console.log(s);
		expect(s).toContain("<g electrical-type='P'");
		expect(s).toContain("<path d=\"M0,0");

		expect(s).toContain("<g electrical-type='S'");
		expect(s).toContain("<g electrical-type='Disj'");
		expect(s).toContain("<g electrical-type='Neon'");
	});
});
