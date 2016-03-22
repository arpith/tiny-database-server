# Tiny Database Server 
An in-memory database server using node.js

## Installation
1. `git clone https://github.com/arpith/tiny-database-server`
2. `cd tiny-database-server`
3. `npm install && npm start`

## Usage
The server is accessible on http://localhost:4000/

### Setting a value
`curl http://localhost:4000/set?key=value`

### Getting a value
`curl http://localhost:4000/get?key=name`

This will return the value previously stored.

### Getting a snapshot
`curl http://localhost:4000/get?snapshot=true`

This will return a JSON string of the database.

## Running the tests
1. Install and start the server
2. In another terminal window/tab run `npm test`
