const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("backend/databases/Users.db", (err) => {
    if (err) return console.error("Database connection error:", err);
    console.log("Connected to SQLite database.");

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );`);
});

module.exports = db;
