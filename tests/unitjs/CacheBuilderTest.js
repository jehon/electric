
describe("CacheBuilderTest.js", function() {
	it("should parse a simple object", function() {
		//let schema = mockSimpleCircuit();
		//expect(schema).not.toBeNull();
		let schema = new Disj();
		schema.next.push(new P());
		schema.alternate.push(new S());

		let cb = new CachedBuilder(schema);

		let res = cb.build();
		console.log(res);
	})
});