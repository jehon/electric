describe("findByUUIDTest.js", function () {
  it("should find back the uuid", function () {
    BuildSingleElement.testResetUUID();
    let schema = mockSimpleCircuit().schema;
    expect(schema).not.toBeNull();

    let cb = new BuildSingleElement(schema);
    cb.build();

    expect(schema.next[0].type).toBe("P");
    expect(schema.next[0].getId()).toBe(2);

    expect(schema.next[0].next[0].type).toBe("S");
    expect(schema.next[0].next[0].getId()).toBe(3);

    expect(findByUUID(2, schema).type).toBe("P");
    expect(findByUUID(3, schema).type).toBe("S");
    expect(findByUUID(1, schema).type).toBe("Disj");

    expect(findByUUID("_3", schema).type).toBe("S");
  });
});
