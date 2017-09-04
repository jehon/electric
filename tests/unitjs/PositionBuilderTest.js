
describe("PositionBuilderTest.js", function() {
	SingleElementBuilder.testResetUUID();
	let schema = mockSimpleCircuit().schema;
	(new NameBuilder(schema)).build();

	it("should build P", function() {
		// PositionBuilder.separator = ".";

		let pb = new PositionBuilder(schema);

		let el = schema.next[0];
		let s = pb.build("1");

		// console.log(s);
		expect(s).toContain("<g electrical-type='P'");
		expect(s).toContain("<path d=\"M0,0");

		expect(s).toContain("<g electrical-type='S'");
		expect(s).not.toContain("<g electrical-type='Disj'");
		expect(s).toContain("<g electrical-type='Neon'");
	});
});
