'use strict';

const fs = require('fs');
const rule = 'city - city - distance';

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

const getLinks = file => {
  let links = [];
  let strings = parser(file);
  for (const string of strings) {
    let temp = string.split(' - ');
    let obj = {
      from: temp[0],
      to: temp[1],
      distance: temp[2],
    }
    links.push(obj);
  }
  return links;
}

module.exports = {
  getLinks,
}
