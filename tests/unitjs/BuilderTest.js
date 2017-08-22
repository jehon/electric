
describe("BuilderTest.js", function() {
	it("should parse a simple object", function() {
		//let schema = mockSimpleCircuit();
		//expect(schema).not.toBeNull();
		let schema = new Disj();
		schema.next.push(new P());
		schema.alternate.push(new S());

		schema.next[0].next.push(new Disj());

		let cb = new Builder(schema);


		let i = 0;

		cb.getOneNext      = () => { i = i + 1 };
		cb.getOneAlternate = () => { i = i + 10 };
		cb.buildSelf       = () => { i = i + 100 };
		cb.buildAssembly   = () => { i = i + 1000 };

		cb.build();
		expect(i).toBe(2212);
	})
});
