describe("calculate away corretly", function () {
  let w = 10;
  let h = 100;

  it("should find at 0°", function () {
    let tp = away(w, h, 0);
    expect(tp.x).toBeCloseTo(w, 0);
    expect(tp.y).toBeCloseTo(h / 2, 0);
  });

  it("should find at 90°", function () {
    let tp = away(w, h, 90);
    expect(tp.x).toBeCloseTo(h / 2, 0);
    expect(tp.y).toBeCloseTo(w, 0);
  });

  it("should find at 180°", function () {
    let tp = away(w, h, 180);
    expect(tp.x).toBeCloseTo(0, 0);
    expect(tp.y).toBeCloseTo(h / 2, 0);
  });

  it("should find at 270°", function () {
    let tp = away(w, h, 270);
    expect(tp.x).toBeCloseTo(50, 0);
    expect(tp.y).toBeCloseTo(0, 0);
  });
});
