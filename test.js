'use strict'

const http = require('http');
const crypto = require('crypto');
const querystring = require('querystring');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:4000';

function randomString() {
  let token = crypto.randomBytes(48).toString('base64');
  return encodeURIComponent(token);
}

function set(obj) {
  let query = querystring.stringify(obj);
  let url = BASE_URL + '/set?' + query;
  return fetch(url).then(res => res.status).catch(err => Promise.reject(err));
}

function get(key) {
  let url = BASE_URL + '/get?key=' + key;
  return fetch(url).then(res => res.text()).catch(err => Promise.reject(err));
}

function check(key, value) {
  return get(key).then((returnedValue) => {
    const msg = "Got " + returnedValue + " expected " + value + " (for key " + key + ")";
    if (returnedValue === value) return Promise.resolve(value);
    else return Promise.reject(msg);
  }).catch(err => Promise.reject(err));
}

function testSetSingleKey() {
  console.log("Going to perform Set Single Key Test");
  const err = "Set Single Key Test Failed: \n";
  const key = randomString();
  const value = randomString();
  let obj = {};
  obj[key] = value;
 return set(obj).then(() => check(key, value)).catch(e => Promise.reject(err + e));
}

function testSetMultipleKeys() {
  console.log("Going to perform Set Multiple Keys Test");
  const err = "Set Multiple Key Test Failed: \n";
  let obj = {};
  let keys = [];
  for (var i=0; i<10; i++) {
    const key = randomString();
    const value = randomString();
    obj[key] = value;
    keys.push(key);
  }
  return set(obj).then(() => {
    const promiseArr = keys.map(key => check(key, obj[key]));
    return Promise.all(promiseArr);
  }).catch(e => Promise.reject(err + e));
}

testSetSingleKey().then(testSetMultipleKeys).then(() => {
  console.log("All tests passed");
}).catch((err) => {
  console.log(err);
});
