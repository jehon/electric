
describe("PositionBuilderTest.js", function() {
	IdBuilder.testResetUUID();
	let schema = mockSimpleCircuit();
	(new NameBuilder(schema)).build();
	(new IdBuilder(schema)).build();

	it("should build P", function() {
		let pb = new PositionBuilder(schema);

		let el = schema.next[0];
		let s

		s = pb.build();
		expect(s).toContain("<g electrical-type='P'");
		expect(s).toContain("<path d=\"M0,0");

		expect(s).toContain("<g electrical-type='S'");
		expect(s).toContain("<g electrical-type='Disj'");
-		expect(s).toContain("<g electrical-type='Neon'");
	});
});
