// backend/services/UserService.js
const bcrypt = require('bcrypt');
const db = require('../db'); // Our single database instance

class UserService {
    // Hashes the password before storing it
    async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    // Creates a new user in the database
    createUser(email, hashedPassword, callback) {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.run(sql, [email, hashedPassword], function(err) {
            // Use a traditional function to access `this.lastID`
            callback(err, { id: this ? this.lastID : undefined });
        });
    }

    // Finds a user by their email address
    findUserByEmail(email, callback) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, user) => {
            callback(err, user);
        });
    }

    // Compares a plaintext password with a stored hash
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = new UserService();