'use strict';

const PARCER = require('./parcer');
const GRAPH = require('./graph');

class Cell {
  constructor(parent, weight) {
    this.parent = parent;
    this.weight = weight;
  }
}

const createGraph = file => {
  const graph = new GRAPH.Graph();
  const links = PARCER.getLinks(file);
  for (const link of links) {
    const { to, from, distance } = link;
    graph.add(new GRAPH.City(from, graph))
         .add(new GRAPH.City(to, graph));
    graph.getCity(from).link(graph.getCity(to), distance);
  }
  return graph;
}

// const dijkstra = (from, to, graph) => {
//   const pointer = new GRAPH.Pointer(graph, from);
//   const cities = graph.cities;
//   const table = new Map();
//   for (const city of cities) table.set(city.name, new Cell())
// } 

// const getRoute = (from, to) => {

// }

const graph = createGraph('cities.txt');

console.log(graph.cities.length);
