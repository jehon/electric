
describe("DrawerTest.js", function() {
	IdBuilder.testResetUUID();
	let schema = mockSimpleCircuit().schema;
	(new NameBuilder(schema)).build();
	(new IdBuilder(schema)).build();

	it("should build P", function() {
		let el = schema.next[0];
		let s

		s = draw(el).build();
		expect(s).toMatch("<g electrical-type='P' id='" + el.getId() + "'");
		expect(s).toMatch("<path d=\"M0,0");

		s = draw(el).rotate().build();
		expect(s).toMatch("<g electrical-type='P' id='" + el.getId() + "'");
		expect(s).toMatch("<path d=\"M0,0");

		s = draw(el).rotate().scale().build();
		expect(s).toMatch("<g electrical-type='P' id='" + el.getId() + "'");
		expect(s).toMatch("<path d=\"M0,0");
	});
});
