const dbs = require('../config/db.js');
const ObjectID = require('mongodb').ObjectID;

async function getUserById(id){ 
    const db = await dbs;
    const coll = db.collection('user');
    const tmp = ObjectID(id);
    const u = await coll.findOne({ _id: tmp });
    return u;
}

async function getUserByName(name){
    const db = await dbs;
    const coll = db.collection('user');
    const u = await coll.findOne({ user_name: name });
    return u;
}

module.exports = { getUserById, getUserByName};