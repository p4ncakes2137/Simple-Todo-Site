const db = require("./db");

function createTask(userId, content, callback) {
    db.run("INSERT INTO tasks (user_id, content) VALUES (?, ?)", [userId, content], function(err) {
        callback(err, this.lastID);
    });
}

function getUserTasks(userId, callback) {
    db.all("SELECT * FROM tasks WHERE user_id = ?", [userId], callback);
}

function updateTask(taskId, userId, completed, callback) {
    db.run("UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?", [completed, taskId, userId], function(err) {
        callback(err, this.changes);
    });
}

function deleteTask(taskId, userId, callback) {
    db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId], function(err) {
        callback(err, this.changes);
    });
}

module.exports = { createTask, getUserTasks, updateTask, deleteTask };
