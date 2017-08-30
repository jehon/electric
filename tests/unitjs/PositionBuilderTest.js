
describe("PositionBuilderTest.js", function() {
	IdBuilder.testResetUUID();
	let schema = mockSimpleCircuit().schema;
	(new NameBuilder(schema)).build();
	(new IdBuilder(schema)).build();

	it("should build P", function() {
		// PositionBuilder.separator = ".";

		let pb = new PositionBuilder(schema);

		let el = schema.next[0];
		let s = pb.build();

		// console.log(s);
		expect(s).toContain("<g electrical-type='P'");
		expect(s).toContain("<path d=\"M0,0");

		expect(s).toContain("<g electrical-type='S'");
		expect(s).toContain("<g electrical-type='Disj'");
		expect(s).toContain("<g electrical-type='Neon'");
	});
});
