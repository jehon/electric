
describe("BuildPositionTest.js", function() {
	BuildSingleElement.testResetUUID();
	let schema = mockSimpleCircuit().schema;

	it("should build P", function() {
		// BuildPosition.separator = ".";

		let pb = new BuildPosition(schema);
		let s = pb.build("cave");

		// console.log(s);
		expect(s).toContain("<g electrical-type='P'");
		expect(s).toContain("<path d=\"M0,0");

		expect(s).toContain("<g electrical-type='S'");
		expect(s).not.toContain("<g electrical-type='Disj'");
		expect(s).toContain("<g electrical-type='Neon'");
	});
});
