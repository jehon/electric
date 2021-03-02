
describe("DrawerTest.js", function() {
	BuildSingleElement.testResetUUID();
	let schema = mockSimpleCircuit().schema;
	(new BuildName(schema)).build();
	(new BuildSingleElement(schema)).build();

	it("should build P", function() {
		let el = schema.next[0];
		let s

		s = draw(el).build();
		expect(s).toMatch("<g electrical-type='P' id='_" + el.getId() + "'");
		expect(s).toMatch("<path d=\"M0,0");
	});
});
