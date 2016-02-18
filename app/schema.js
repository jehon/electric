
export default {
  type: 'Diff',
  reference: 'Central',
  next: [
    {
      type: 'Disj',
      reference: 'A23',
    },
    {
      type: 'Disj',
      reference: 'A24',
      next: [
        {
          type: 'P',
          x: 290,
          y: 134,
          orientation: 0,
          plan: 1,
          next: [
            {
              type: 'P',
              x: 290,
              y: 340,
              orientation: 180,
              plan: 1,
            },
            {
              type: 'P',
              x: 510,
              y: 134,
              orientation: 0,
              plan: 1,
            }
          ]
        },
        {
          type: 'S',
          x: 500,
          y: 355,
          orientation: 180,
          plan: 1,
          next: [
            {
              type: 'L',
              x: 700,
              y: 230,
              orientation: 0,
              plan: 1
            }
          ]
        }
      ]
    },
    {
      type: 'Disj',
      reference: 'A25',
    }
  ]
};
