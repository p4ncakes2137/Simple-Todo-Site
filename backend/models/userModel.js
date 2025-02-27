const db = require("./db");
const bcrypt = require("bcrypt");

async function createUser(username, password, callback) {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], callback);
}

function findUserByUsername(username, callback) {
    db.get("SELECT * FROM users WHERE username = ?", [username], callback);
}

module.exports = { createUser, findUserByUsername };
