const express = require("express");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/userModel");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    createUser(username, password, (err) => {
        if (err) return res.status(400).json({ message: "User already exists" });
        res.status(201).json({ message: "User registered successfully" });
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    findUserByUsername(username, async (err, user) => {
        if (err || !user) return res.status(401).json({ message: "Invalid credentials" });

        const validPassword = await require("bcrypt").compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Strict", maxAge: 86400000 });
        res.json({ message: "Login successful", token });
    });
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
