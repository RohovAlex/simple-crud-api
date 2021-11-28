const http = require('http');
const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    
    const url = req.url;
    const method = req.method;
    
    if(url === '/person' && method === 'GET') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify('Get all users'));
        res.end(JSON.stringify(req.url));
    } else if (url === '/person' && method === 'POST') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify('Create user'));
        res.end(JSON.stringify(req.url));
    } else {
        const urlParts = url.split('/');
        const id = urlParts[2];
        const urlRootPart = urlParts[1];
        const urlPartsLength = urlParts.length;
        const isIduuid = uuidValidate(id) && uuidVersion(id) === 4;
        
        if(urlPartsLength > 3 || urlRootPart !== 'person') {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify(`requested resource ${url} does not exist`));
        }

        if(!isIduuid) {
            res.writeHead(400, {'Content-type': 'application/json'});
            res.end(JSON.stringify(`Id ${id} in your request isn't uuid`));
        }

        console.log(uuidv4());

        if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'GET' && isIduuid) {
            console.log('GET another url');
        } else if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'PUT' && isIduuid) {
            console.log('PUT another url');
        } else if (url.match(/\/person\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/) && method === 'DELETE' && isIduuid) {
            console.log('DELETE another url');
        } else {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify(`requested resource ${url} does not exist`));
        }
    } 

    
});

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server is running on port: ' + PORT);
})
