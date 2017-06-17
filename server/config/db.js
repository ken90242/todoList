const MongoClient = require('mongodb').MongoClient;
const prefix = "mongodb://localhost";
const port = 27017;
const database = "todolist";
const url = `${prefix}:${port}/${database}`;


module.exports = MongoClient.connect(url);