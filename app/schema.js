
export default {
  children: [
    {
      type:'Disj',
      name: '1',
      children: [
        {
          type: 'P',
          x: 75,
          y: 100,
          orientation: 90,
          plan: 1,
          name: '90'
        },
        {
          type: 'P',
          x: 100,
          y: 200,
          orientation: 270,
          plan: 1,
          name: '270'
        }
      ]
    },
    {
      type: 'P',
      x: 10,
      y: 10,
      orientation: 0,
      plan: 1,
      name: 'T'
    },
    {
      type: 'P',
      x: 100,
      y: 40,
      orientation: 180,
      plan: 2,
      name: 'P2-180'
    }
  ]
};
