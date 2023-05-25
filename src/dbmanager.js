const sqlite3 = require('sqlite3').verbose();
const path = './database.db';
let db;

/*
    return connection to database
*/
function connection(){
    db = new sqlite3.Database(path);
    return db;
}

function terminate(){
    db.close();
}

module.exports = { connection, terminate };