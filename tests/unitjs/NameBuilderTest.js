
describe("NameBuilderTest.js", function() {
	it("should build correct names", function() {
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		let cb = new NameBuilder(schema);
		cb.buildWithPrint();

		expect(schema.getName()).toBe("A11");
		expect(schema.next[0].getName()).toBe('A11.1');
		expect(schema.next[0].next[0].getName()).toBe('A11.2');
		expect(schema.next[0].next.length).toBe(1);
		expect(schema.next[0].next[0].next[0].getName()).toBe('A11.3');
		expect(schema.next[0].next[0].alternate[0].getName()).toBe('A11.2a.1');
	});

	it("should build correct names when id are set", function() {
		IdBuilder.testResetUUID();
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		let cb = new NameBuilder(schema);
		let id = new IdBuilder(schema);
		id.build();
		cb.buildWithPrint();

		expect(schema.getName()).toBe("A11");
		expect(schema.next[0].getName()).toBe('A11.1');
		expect(schema.next[0].next[0].getName()).toBe('A11.2');
		expect(schema.next[0].next.length).toBe(1);
		expect(schema.next[0].next[0].next[0].getName()).toBe('A11.3');
		expect(schema.next[0].next[0].alternate[0].getName()).toBe('A11.2a.1');
	});
});
