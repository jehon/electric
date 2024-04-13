const mockSimpleCircuitJSON = JSON.stringify(
  // reference -> name
  // Rotate: +270: P, S, Hotte, Heater, Boiler, CookingPlates, Transfo
  //          <g transform='translate(0, ${height / 2})'>
  // options -> on value
  {
    schema: {
      type: "Disj",
      name: "A11",
      label: "atelier/ecl",
      next: [
        {
          type: "P",
          x: 10,
          y: 10,
          plan: "cave",
          next: [
            {
              type: "S",
              x: 20,
              y: 10,
              orientation: 180,
              plan: "rdc",
              bidir: true,
              alternate: [
                {
                  type: "S",
                  x: 20,
                  y: 20,
                  orientation: 270,
                  plan: "cave",
                  alternate: [{ type: "Neon", x: 30, y: 30, plan: "cave" }],
                },
              ],
              next: [
                {
                  type: "P",
                  x: 40,
                  y: 40,
                  plan: "cave",
                  next: [
                    {
                      type: "S",
                      x: 40,
                      y: 50,
                      plan: "cave",
                      bipol: true,
                      alternate: [{ type: "Neon", x: 50, y: 50, plan: "cave" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    plans: {
      cave: { src: "/cave.jpg", scale: 0.5, width: 100, height: 200 },
      rdc: { src: "/rdc.png", scale: 0.5, width: 100, height: 200 },
    },
  },
);

function mockSimpleCircuit() {
  return JSON.parse(mockSimpleCircuitJSON);
}
