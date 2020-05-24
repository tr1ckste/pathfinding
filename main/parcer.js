'use strict';

const fs = require('fs');
const rulePlace = 0;

const getData = file => {
  let data;
  try {
    data = fs.readFileSync(`./${file}`).toString();
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
  let rule =  parser(file)[rulePlace];
  return rule.split('rule: ').pop().replace(/\'/g, '');
}

const getLinks = file => {
  const links = [];
  const strings = parser(file);
  const rule = getRule(file);
  strings.splice(rulePlace, 1);
  for (const string of strings) {
    let temp = string.split(rule);
    let obj = {
      from: temp[0],
      to: temp[1],
      distance: +temp[2],
    }
    links.push(obj);
  }
  return links;
}

module.exports = {
  getLinks,
}

// console.log(getLinks('cities.txt'));