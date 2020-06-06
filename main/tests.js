'use strict';

const assert = require('assert').strict;

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

{
  //// tests for index.js
  const INDEX = require('./index.js');

  /// tests for getCell function

  const testsGetCell = [
    [
      'Riga',
      {
        name: 'Riga',
        parent: 'Budapest',
        weight: 98,
      },
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
      const output  = INDEX.getCell(input, cells);
      assert.deepStrictEqual(output, expexted, input);
    } catch (err) {
      if (err.message !== expexted) {
        console.log(`Test failed: ${input}`);
      }
    }
  }

  /// tests for getNextCity function
  const all = ['Riga', 'York', 'Moscow', 'Athens', 'Bratislava'];

  const testsGetNextCity = [
    [ ['Moscow', 'Athens'], cells, 'Riga'      ],
    [ ['Riga'], cells, 'York'      ],
    [ ['Riga', 'York'], cells, 'Bratislava'],
    [ [], cells, 'Riga'      ],
    [ all, cells,  undefined  ],
  ];

  for (const test of testsGetNextCity) {
    const [passed, cells, expexted] = test;
    const result = INDEX.getNextCity(cells, passed);
    try {
      assert.strictEqual(result, expexted, 'Failed in test');
    } catch (err) {
      console.log(err);
    }
  }
}

{
  ////tests for graph.js

  const GRAPH = require('./graph.js');

  //add method tests

  const addGraphTest = () => {
    const graph = new GRAPH.Graph();
    graph.add(cells[0], cells[1]);
    const expexted = [cells[0], cells[1]];
    try {
      assert.deepStrictEqual(graph.cities, expexted, 'Failed in test');
    } catch (err) {
      console.log(err);
    }
  };

  const chainAddGraphTest = () => {
    const graph = new GRAPH.Graph();
    graph.add(cells[0]).add(cells[1]).add(cells[3]);
    const expexted = [cells[0], cells[1], cells[3]];
    try {
      assert.deepStrictEqual(graph.cities, expexted, 'Failed in test');
    } catch (err) {
      console.log(err);
    }
  };

  const duplicateAddTest = () => {
    const graph = new GRAPH.Graph();
    graph.add(cells[0]).add(cells[0]).add(cells[0]).add(cells[1]);
    const expexted = [cells[0], cells[1]];
    try {
      assert.deepStrictEqual(graph.cities, expexted, 'Failed in test');
    } catch (err) {
      console.log(err);
    }
  };

  const addTests = [addGraphTest, chainAddGraphTest, duplicateAddTest];

  for (const test of addTests) {
    test();
  }

  //getCity method test
  const graph = new GRAPH.Graph();
  graph.add(cells[1], cells[2], cells[3]);

  const getCityTests = [
    ['York', 'Not found' ],
    ['Athens', cells[1] ],
    ['Moscow', cells[2] ],
  ];

  for (const test of getCityTests) {
    const [ input, expexted ] = test;
    try {
      const result = graph.getCity(input);
      assert.deepStrictEqual(result, expexted, 'Fail in tests');
    } catch (err) {
      if (err.message !== expexted) {
        console.log(err);
      }
    }
  }

  //hasCity method test

  const hasCityTests = [
    ['York', false ],
    ['Athens', true ],
    ['Moscow', true ],
  ];

  for (const test of hasCityTests) {
    const [ input, expexted ] = test;
    try {
      const result = graph.hasCity(input);
      assert.deepStrictEqual(result, expexted, 'Fail in tests');
    } catch (err) {
      if (err.message !== expexted) {
        console.log(err);
      }
    }
  }
}
