const db = [];
const personsMethods = {
    getAll = () => db,

    getById = (id) => {
        return db.find((person) => person.id === id);
    }, 
    updateById = (id, personForUpdate) => {
        const indexForUpdate = db.findIndex((person) => person.id === id);
        db.splice(indexForUpdate, 1);
        personForUpdate.id = id;
        db.push(personForUpdate);

        return personForUpdate;
    },
    deleteById = (id) => {
        const indexForDelete = db.findIndex((person) => person.id === id);
        const deletedPerson = db.splice(indexForDelete, 1);
        
        return deletedPerson;
    },
    create = (person) => {
        db.push(person);
    }
}
module.exports = personsMethods;