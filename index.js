'use strict'

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const HOSTNAME = 'localhost';
const PORT = 4000;

let database = {};

function addToDatabase(obj) {
  database = Object.assign(database, obj);
  return Promise.resolve();
}

function getFromDatabase(key) {
  return Promise.resolve(database[key]);
}

function requestHandler(req) {
  // Checks the route (get or set) and returns a promise to do the operation
  let parsedURL = url.parse(req.url);
  let parsedQuery = querystring.parse(parsedURL.query);
  let response = {status: 200, body: {success: true}};
  if (parsedURL.pathname === '/set') {
    return addToDatabase(parsedQuery);
  } else if (parsedURL.pathname === '/get') {
    return getFromDatabase(parsedQuery.key);
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
