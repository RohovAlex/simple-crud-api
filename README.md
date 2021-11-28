This is a simple CRUD API server.

To launch it you need:

fork this repository
clone it to your PC
install all packages with command: npm i
using terminal start index.js with command: node index.js
to launch it in development mode with nodemon use command: npm run dev

The server will run on the port 3000

How it works?

API path /person:
1. GET /person or /person/${personId} should return all persons or person with corresponding personId
2. POST /person is used to create record about new person and store it in database
3. PUT /person/${personId} is used to update record about existing person
4. DELETE /person/${personId} is used to delete record about existing person from database

Persons are stored as objects that have following properties:
id — unique identifier (string, uuid) generated on server side
name — person's name (string, required)
age — person's age (number, required)
hobbies — person's hobbies (array of strings or empty array, required)



