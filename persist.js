'use strict'
const fs = require('fs');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:4000';

function getSnapshot() {
  let url = BASE_URL + '/get?snapshot=true';
  return fetch(url).then(res => res.text()).catch(err => Promise.reject(err));
}

function persist() {
  getSnapshot().then((snapshot) => {
    fs.writeFileSync('database.json', snapshot);
  });
}

setInterval(persist, 1000);
