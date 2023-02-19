const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./master.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT,
    age INTEGER,
    email TEXT,
    image TEXT)`, (err) => {
        if (err) return console.error(err.message);
    })
})


module.exports = db;
