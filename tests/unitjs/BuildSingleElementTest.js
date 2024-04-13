describe("BuildSingleElementTest.js", function () {
  it("should refresh the data when data is modified", function () {
    BuildSingleElement.testResetUUID();
    let schema = mockSimpleCircuit().schema;
    expect(schema).not.toBeNull();
    let cb = new BuildSingleElement(schema);
    cb.build();

    expect(BuildSingleElement.nextUUID()).toBe(9);
    expect(schema.next[0].type).toBe("P");
    expect(schema.next[0].getId()).toBe(2);
    expect(schema.next[0].getReference().type).toBe("P");
    expect(schema.next[0].getVal("type")).toBe("P");
    expect(schema.next[0].getVal("x")).toBe(10);
    expect(schema.next[0].getVal("width")).toBe(20);
    expect(() =>
      schema.next[0].getVal("test-value-will-console.log")
    ).toThrow();

    expect(schema.next[0].next[0].type).toBe("S");
    expect(schema.next[0].next[0].getId()).toBe(3);
    expect(schema.next[0].next[0].getReference().type).toBe("S");
  });
});
