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
