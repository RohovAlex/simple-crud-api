const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid');

const personsMethods = require('./personsMethods');
module.exports = (req, res) => {
    
    const url = req.url;
    const method = req.method;
    
    if(url === '/person' && method === 'GET') {
        const persons = personsMethods.getAll();
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(persons));

    } else if (url === '/person' && method === 'POST') {
        let body = '';
        req.on('data', (chank) => {
            body += chank.toString();
        })
        req.on('end', () => {
            try {
                const {name, age, hobbies } = JSON.parse(body);
                if(name && age && hobbies) {
                    const newPerson = {};
                    newPerson.name = name;
                    newPerson.age = age;
                    newPerson.hobbies = hobbies;
                    newPerson.id = uuidv4();

                    personsMethods.create(newPerson);

                    res.writeHead(201, {'Content-type': 'application/json'});
                    res.end(JSON.stringify(newPerson));
                    
                } else {
                    res.writeHead(400, {'Content-type': 'application/json'});
                    res.end(JSON.stringify('invalid data or empty required fields'));
                }
            } catch (error) {
                res.writeHead(500, {'Content-type': 'application/json'});
                res.end(JSON.stringify('Something went wrong on server'));
            }
            
            
        })

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
   
}