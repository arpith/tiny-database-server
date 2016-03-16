'use strict'

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const HOSTNAME = 'localhost';
const PORT = 4000;

let database = {};

function addToDatabase(key, value) {
  let unescapedValue = querystring.unescape(value);
  database[key] = unescapedValue;
  return Promise.resolve();
}

function getFromDatabase(key) {
  return Promise.resolve(database[key]);
}

function requestHandler(req) {
  // Checks the route (get or set) and returns a promise to do the operation
  let parsedURL = url.parse(req.url);
  let response = {status: 200, body: {success: true}};
  if (parsedURL.pathname === '/set') {
    // Only handle one key/value
    // Will fail if '=' is in the key or the value
    let splitQuery = parsedURL.query.split('=');
    let key = splitQuery[0];
    let value = splitQuery[1];
    return addToDatabase(key, value);
  } else if (parsedURL.pathname === '/get') {
    // Will fail if multiple keys are requested
    let key = parsedURL.query.split('key=')[1];
    return getFromDatabase(key);
  } else {
    return Promise.reject(400);
  }
}

function requestListener(req, res) {
  let header = { 'Content-Type': 'text/plain' };
  requestHandler(req).then((response) => {
    res.writeHead(200, header);
    res.end(response);
  }).catch((status) => {
    res.writeHead(status, header);
    res.end();
  });
}
   
http.createServer(requestListener).listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
