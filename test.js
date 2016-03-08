const http = require('http');
const crypto = require('crypto');

function randomString() {
  let token = crypto.randomBytes(48).toString(base64);
  return encodeURIComponent(token);
}

function parseResponse() {
  

function set(obj) {
  let query = querystring.stringify(obj);
  return fetch('http://localhost/set?' + query);
}

function get(key) {
  let url = 'http://localhost/get?name=' + key;
  return fetch(url).then(res => res.text())
}

function testSingleKey() {
  let key = randomString();
  let value = randomString();
  let obj = {};
  obj[key] = value;
  set(obj).then(() => get(key)).then((returnedValue) => {
    if (value === returnedValue) Promise.resolve();
    else Promise.reject("Single Key Test failed");
  });
}

function testMultipleKeys() {
  let obj = {};
  let keys = [];
  for (var i=0; i<10; i++) {
    let key = randomString();
    let value = randomString();
    obj[key] = value;
    keys.push[key];
  }
  let promiseArr = keys.map(key => get(key));
  set(obj).then(Promise.all(promiseArr).then((values) => {
    for (var i=0; i<10; i++) {
      let key = keys[i];
      let value = values[i];
      if (obj[key] === value) Promise.resolve();
      else Promise.reject("Multiple Key Test failed");

    }
  });
}
