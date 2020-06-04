'use strict';

const fs = require('fs');
const rulePlace = 0;

class Link {
  constructor(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = +distance;
  }
}

const getData = file => {
  let data;
  try {
    data = fs.readFileSync(`${file}`).toString();
  } catch (err) {
    console.error(err);
  }
  return data;
};

const parser = file => {
  const data = getData(file);
  return data.split('\n');
};

const getRule = file => {
  const rule =  parser(file)[rulePlace];
  return rule.split('rule: ').pop().replace(/\'/g, '');
};

const getLinks = file => {
  const links = [];
  const strings = parser(file);
  const rule = getRule(file);
  strings.splice(rulePlace, 1);
  for (const string of strings) {
    const [from, to, distance] = string.split(rule);
    const link = new Link(from, to, distance);
    links.push(link);
  }
  return links;
};

module.exports = {
  parser,
  getRule,
  getLinks,
};

// console.log(getLinks('cities.txt'));
