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
}

const parser = file => {
  const data = getData(file);
  return data.split('\n');
}



console.log(parser('cities.txt'));