
describe("IdBuilderTest.js", function() {
	let i;

	let resetCounters = function() {
		i = { 
			next: 0,
			alt: 0,
			assembly: 0,
			self: 0
		};
	};
	resetCounters();

	it("should refresh the data when data is modified", function() {
		let schema = mockSimpleCircuit();
		expect(schema).not.toBeNull();
		let cb = new IdBuilder(schema);
		cb.build();

		expect(IdBuilder.nextUUID()).toBe(9);
		expect(schema.next[0].getId()).toBe(7);
		expect(schema.next[0].next[0].getId()).toBe(6);
	});
});
