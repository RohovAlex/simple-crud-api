const http = require('http');
require('dotenv').config();

const router = require('./src/router')

const PORT = process.env.PORT;

const server = http.createServer(router);

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server is running on port: ' + PORT);
})
