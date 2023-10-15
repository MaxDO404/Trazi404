const sqlite3 = require("sqlite3");
const path = require('path');
const DB_FILE = path.resolve(__dirname, '../data/data.db');

const db = new sqlite3.Database(DB_FILE, sqlite3.OPEN_READWRITE, err => {
    if (err) return console.error(err.message);
});

module.exports = db;