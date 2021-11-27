const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer();

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server is running on port: ' + PORT);
})
