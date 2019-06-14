const db = require('../database/dbConfig');

function add(user) {
    return db('users').insert(user);
}

function findBy(filter) {
    return db('users').where(filter).first();
}

module.exports =  {
    add,
    findBy,
}