const mockSimpleCircuitJSON = JSON.stringify(
    // reference -> name
    // Rotate: P, S, Hotte, Heater, Boiler, CookingPlates, Transfo
    // options -> on value

    { "type": "Disj", "name": "A11", "label": "atelier/ecl", "next": [
      { "type": "P", "x": 10, "y": 10, "plan": "1", "next": [
        { "type": "S", "x": 20, "y": 10, "orientation": 180, "plan": "1", "bidir": true,
          "alternate": [
            { "type": "S", "x": 20, "y": 20, "orientation": 270, "plan": "1",
             "alternate": [ { "type": "Neon", "x": 30, "y": 30, "plan": "1" } ]
            }
            ],
          "next": [
            { "type": "P", "x": 40, "y": 40, "plan": "1", "next": [
              { "type": "S", "x": 40, "y": 50, "plan": "1", "bipol": true, "alternate": [
                { "type": "Neon", "x": 50, "y": 50, "plan": "1" }
              ]}
            ]}
          ]}
      ]}
    ]
  });

function mockSimpleCircuit() {
  return JSON.parse(mockSimpleCircuitJSON);
}
