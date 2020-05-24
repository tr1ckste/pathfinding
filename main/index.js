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

const getNextCity = (map, passed) => {
  let arr = [];
  for (const key of map.keys()) arr.push(key);
  arr = arr.filter(city => {
    for (const el of passed) {
      if (city === el) return false;
    }
    return true;
  });
  let minWeight = Infinity;
  let minKey;
  for (const key of arr) {
    if (map.get(key).weight < minWeight) {
      minWeight = map.get(key).weight;
      minKey = key;
    }
  }
  return minKey;
}

const dijkstra = (from, graph) => {
  const cities = graph.cities;
  const table = new Map();
  const passed = [];
  for (const city of cities) table.set(city.name, new Cell('', Infinity));
  table.get(from).weight = 0;
  let current = from;
  for (const qqq of table.keys()) {
    let city = graph.getCity(current);
    for (const key of city.links.keys()) {
      if (table.get(key).weight > city.links.get(key) + table.get(current).weight) {
        table.get(key).weight = city.links.get(key) + table.get(current).weight;
        table.get(key).parent = current;
      }
    }
    passed.push(current);
    current = getNextCity(table, passed);
  }
  return table;
}

const getRoute = (from, to, graph) => {
  const table = dijkstra(from, graph);
  let route = to;
  let current = to;
  while(true) {
    let parent = table.get(current).parent;
    route = parent + ' - ' + route;
    current = parent;
    if (current === from) break;
  }
  return route;
}

const graph = createGraph('cities.txt');

console.log(getRoute('Rivne', 'Luhans\'k', graph));
