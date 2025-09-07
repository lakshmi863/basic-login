// backend/controllers/AuthController.js
const UserService = require('../services/UserService');

class AuthController {
    // Handle user registration
    async register(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            // Check if user already exists
            UserService.findUserByEmail(email, async (err, user) => {
                if (err) {
                    return res.status(500).json({ message: 'Server error during user lookup.' });
                }
                if (user) {
                    return res.status(409).json({ message: 'User with this email already exists.' });
                }

                // Hash password and create user
                const hashedPassword = await UserService.hashPassword(password);
                UserService.createUser(email, hashedPassword, (err, newUser) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to create user.' });
                    }
                    res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
                });
            });
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    // Handle user login
    login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        UserService.findUserByEmail(email, async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server error during login.' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' }); // Use a generic message for security
            }

            // Verify password
            const isMatch = await UserService.verifyPassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // Set up the session
            req.session.userId = user.id;
            req.session.email = user.email;

            res.status(200).json({ message: 'Login successful.', user: { id: user.id, email: user.email } });
        });
    }

    // Handle user logout
    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out, please try again.' });
            }
            res.clearCookie('connect.sid'); // Clears the session cookie
            res.status(200).json({ message: 'Logout successful.' });
        });
    }

    // Check login status
    checkAuth(req, res) {
        if (req.session.userId) {
            return res.status(200).json({
                isAuthenticated: true,
                user: { id: req.session.userId, email: req.session.email }
            });
        } else {
            return res.status(401).json({ isAuthenticated: false });
        }
    }
}

module.exports = new AuthController();