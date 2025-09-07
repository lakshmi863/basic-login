require('dotenv').config(); // Load variables from .env

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const AuthController = require('./controllers/AuthController');

// --- APP INITIALIZATION ---
const app = express();
// Use the PORT from .env, or default to 5000 if it's not set
const PORT = process.env.PORT || 5000; 

// --- MIDDLEWARE SETUP ---
// Enable CORS using the origin from .env
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Use the environment variable here
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Session middleware setup using variables from .env
app.use(session({
    secret: process.env.SESSION_SECRET, // Use the secret from .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
        httpOnly: true,
        maxAge: Number(process.env.SESSION_LIFETIME) || 86400000, // Use lifetime from .env
    },
}));

// ... (Your API routes and app.listen call remain the same) ...

// --- API ROUTES ---
app.post('/api/register', AuthController.register);
app.post('/api/login', AuthController.login);
app.post('/api/logout', AuthController.logout);
app.get('/api/check-auth', AuthController.checkAuth);
app.get('/api/dashboard', (req, res) => {
    // ...
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});