const http = require('http');
const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    
    const url = req.url;
    const method = req.method;
    const urlParts = url.split('/');
    const id = urlParts[2];
    const urlRootPart = urlParts[1];
    const urlPartsLength = urlParts.length;
    const isIduuid = uuidValidate(id) && uuidVersion(id) === 4 && urlPartsLength < 4;
    

    console.log(uuidv4());

    if(id && !isIduuid) {

    }

    if(url === '/person' && method === 'GET') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify('Get all users'));
        res.end(JSON.stringify(req.url));
    } else if (url === '/person' && method === 'POST') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify('Create user'));
        res.end(JSON.stringify(req.url));
    } else {
        if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'GET' && isIduuid) {
            console.log('GET another url');
        } else if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'PUT' && isIduuid) {
            console.log('PUT another url');
        } else if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'DELETE' && isIduuid) {
            console.log('DELETE another url');
        } else {
            console.log('Default');
        }
    } 

    
});

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server is running on port: ' + PORT);
})
