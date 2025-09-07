const sqlite3 = require('sqlite3').verbose();

// Use a class to manage the database connection and initialization
class Database {
    constructor(dbName = 'users.db') {
        // Connect to the SQLite database. The file is created if it doesn't exist.
        this.db = new sqlite3.Database(`./${dbName}`, (err) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
            } else {
                console.log('Connected to the SQLite database.');
                this.initializeTables();
            }
        });
    }

    // Create the 'users' table if it doesn't already exist
    initializeTables() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `;
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Users table initialized successfully.');
            }
        });
    }

    // Provide a method to get the database instance
    getDb() {
        return this.db;
    }
}

// Export a single instance of the Database class
module.exports = new Database().getDb();