console.clear();
require('dotenv').config();
const Server = require('./src/modelo/server.js');

const server = new Server();
server.listen();