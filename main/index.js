'use strict';

const PARCER = require('./parser');
const GRAPH = require('./graph');

class Cell {
  constructor(name, parent, weight) {
    this.name = name;
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
};

const getCell = (name, cells) => {
  for (const cell of cells) {
    if (typeof name !== 'string') throw Error('Not a string');
    if (name === cell.name) {
      return cell;
    }
  }
  throw Error('Not found');
};

const substractArrs = (given, substractor) => {
  return given.filter(el => {
    for (const sub of substractor) {
      if (el === sub) return false;
    }
    return true;
  });
};

const getNextCity = (cells, passed) => {
  let available = [];
  for (const cell of cells) available.push(cell.name);
  available = substractArrs(available, passed);
  let minWeight = Infinity;
  let minKey;
  for (const name of available) {
    const cell = getCell(name, cells);
    if (cell.weight < minWeight) {
      minWeight = cell.weight;
      minKey = name;
    }
  }
  return minKey;
};

const createTable = cities => {
  const table = [];
  for (const city of cities) {
    table.push(new Cell(city.name, '', Infinity));
  }
  return table;
};

const iterateTable = (current, table) => {
  for (const key of current.links.keys()) {
    const currCell = getCell(current.name, table);
    const neighbour = getCell(key, table);
    const currLink = current.links.get(key);
    if (neighbour.weight > currLink + currCell.weight) {
      neighbour.weight = currLink + currCell.weight;
      neighbour.parent = current.name;
    }
  }
};

const dijkstra = (from, graph) => {
  const cities = graph.cities;
  const passed = [];
  const table = createTable(cities);
  getCell(from, table).weight = 0;
  let currentName = from;
  while (true) {
    const current = graph.getCity(currentName);
    iterateTable(current, table);
    passed.push(currentName);
    currentName = getNextCity(table, passed);
    if (currentName === undefined) break;
  }
  return table;
};

const getRoute = (from, to, file) => {
  const graph = createGraph(file);
  const table = dijkstra(from, graph);
  let route = to;
  let current = to;
  while (true) {
    const parent = getCell(current, table).parent;
    route = parent + ' - ' + route;
    current = parent;
    if (current === from) break;
  }
  return route;
};

console.log(getRoute('Rivne', 'Luhans\'k', 'cities.txt'));

module.exports = {
  Cell,
  getCell,
  createTable,
  getNextCity,
};
