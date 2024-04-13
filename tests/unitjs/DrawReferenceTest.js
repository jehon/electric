describe("DrawReferenceTest.js", function () {
  it("should build P", function () {
    let ref = drawReference("P");

    expect(ref.type).toBe("P");
    expect(ref.draw).toContain(`<path d="M0,0 L10,0 m0,-7.5`);
    expect(ref.width).toBe(20);
    expect(ref.getVal("width")).toBe(20);
    expect(ref.getVal("orientation")).toBe(0);
    expect(() => ref.getVal("test-value-will-console.log")).toThrow();
  });
});
