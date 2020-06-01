'use strict';

const assert = require('assert').strict;

{
  // index.js
  const INDEX = require('./index.js');
  
  const cells = [
    {
      name: 'York',
      parent: 'Boston',
      weight: 190,
    },
    {
      name: 'Athens',
      parent: 'Paris',
      weight: 500,
    },
    {
      name: 'Moscow',
      parent: 'Kiev',
      weight: 800,
    },
    {
      name: 'Bratislava',
      parent: 'Boston',
      weight: 350,
    },
    {
      name: 'Riga',
      parent: 'Budapest',
      weight: 98,
    },
  ];

  const testsGetCell = [
    [
      'Riga',
      {
        name: 'Riga',
        parent: 'Budapest',
        weight: 98,
      }
    ],
    [
      'York',
      {
        name: 'York',
        parent: 'Boston',
        weight: 190,
      },
    ],
    [
      'Yalta',
      'Not found',
    ],
    [
      12,
      'Not a string',
    ],
    [
      true,
      'Not a string',
    ],
  ];

  for (const test of testsGetCell) {
    const [input, expexted] = test;
    try {
      let output  = INDEX.getCell(input, cells);
      assert.deepStrictEqual(output, expexted, input);
    } catch (err) {
      if (err.message !== expexted) {
        console.log(`Test failed: ${input}`);
      }  
    }
  }

  // const testsGetNextCity = [

  // ];
}