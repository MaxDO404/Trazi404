const db = require('../config/database');
const cero = require('0http');
const { server, router } = cero();
const init  = require('./routes');
init(router, db);
const port = 5555;

server.listen(port);
console.log(`Server listening on port: ${port}`);