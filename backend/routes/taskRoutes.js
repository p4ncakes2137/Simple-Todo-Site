const express = require("express");
const { createTask, getUserTasks, updateTask, deleteTask } = require("../models/taskModel");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

router.post("/", authenticateToken, (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    createTask(req.user.id, content, (err, taskId) => {
        if (err) return res.status(500).json({ message: "Error creating task" });
        res.status(201).json({ id: taskId, content, completed: 0 });
    });
});

router.get("/", authenticateToken, (req, res) => {
    getUserTasks(req.user.id, (err, tasks) => {
        if (err) return res.status(500).json({ message: "Error fetching tasks" });
        res.json(tasks);
    });
});

router.put("/:id", authenticateToken, (req, res) => {
    updateTask(req.params.id, req.user.id, req.body.completed, (err, changes) => {
        if (err || changes === 0) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task updated successfully" });
    });
});

router.delete("/:id", authenticateToken, (req, res) => {
    deleteTask(req.params.id, req.user.id, (err, changes) => {
        if (err || changes === 0) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    });
});

module.exports = router;
