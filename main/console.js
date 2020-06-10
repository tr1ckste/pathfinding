'use strict';

const readline = require('readline');
const INDEX = require('./index.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '[pathfinding] > ',
});

const graph = INDEX.createGraph('cities.txt');
const cities = {
  from: undefined,
  to: undefined,
};

let counter = 0;
const cases = [
  {
    city: 'from',
    getCondition: input => graph.hasCity(input),
    thenCase: () => {
      console.log('Write the destination point:');
      rl.prompt();
    },
  },
  {
    city: 'to',
    getCondition: input => {
      const extraCond = input !== cities.from;
      return graph.hasCity(input) && extraCond;
    },
    thenCase: () => {
      const { from, to } = cities;
      console.clear();
      console.log('Your route:');
      console.log(INDEX.getRoute(from, to, graph));
      rl.close();
    },
  },
];

console.clear();
console.log('Write the point of departure:\n');
console.log();
rl.prompt();

rl.on('line', input => {
  const { city, getCondition, thenCase } = cases[counter];
  input = input.trim();
  if (getCondition(input)) {
    counter++;
    cities[city] = input;
    thenCase();
  } else {
    console.log('Wrong city name');
    rl.prompt();
  }
});
