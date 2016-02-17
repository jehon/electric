
export default {
  type: 'Diff',
  reference: 'Central',
  next: [
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
            }
          ]
        }
      ]
    }
  ]
};
