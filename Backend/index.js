// backend/server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const AuthController = require('./controllers/AuthController');

// --- APP INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE SETUP ---
// Enable CORS for frontend communication
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Session middleware setup
app.use(session({
    secret: 'a_secure_secret_key_that_is_long_and_random', // PLEASE use a strong secret
    resave: false,
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
        secure: false, // Set to true if using HTTPS in production
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        maxAge: 24 * 60 * 60 * 1000, // Session duration (e.g., 1 day)
    },
}));

// --- API ROUTES ---
app.post('/api/register', (req, res) => AuthController.register(req, res));
app.post('/api/login', (req, res) => AuthController.login(req, res));
app.post('/api/logout', (req, res) => AuthController.logout(req, res));
app.get('/api/check-auth', (req, res) => AuthController.checkAuth(req, res));

// Protected route example
app.get('/api/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'You are not authorized. Please log in.' });
    }
    res.status(200).json({ message: `Welcome to the dashboard, User ${req.session.email}!` });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});