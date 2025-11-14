"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await User_1.UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create user
        const user = await User_1.UserModel.create({ name, email, password });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Find user
        const user = await User_1.UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Validate password
        const isValidPassword = await User_1.UserModel.validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
