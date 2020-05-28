'use strict';

class City {
  constructor(name, graph) {
    this.graph = graph;
    this.name = name;
    this.links = new Map();
  }

  link(city, distance) {
    this.links.set(city.name, distance);
    if (!city.links.has(this.name)) {
      city.link(this.graph.getCity(this.name), distance);
    }
    return this;
  }
}

class Graph {
  constructor() {
    this.cities = new Array();
  }

  add(...args) {
    for (const city of args) {
      if (!this.hasCity(city.name)) {
        this.cities.push(city);
      }
    }
    return this;
  }

  getCity(name) {
    for (const city of this.cities) {
      if (city.name === name) return city;
    }
    console.error('no matches found');
  }

  hasCity(name) {
    for (const city of this.cities) {
      if (city.name === name) return true;
    }
    return false;
  }
}

module.exports = {
  City,
  Graph,
};
