const { app, PORT } = require('./app');
const db = require('./backend/config/db.config');

// Ensure the database table 'users' exists or create it if not
db.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, mobile VARCHAR(255), password VARCHAR(255), career_goals TEXT)', (err, res) => {
    if (err) throw err;
    console.log('Table created.');
});

// Start the Express.js server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Error handling for server startup
server.on('error', (err) => {
    console.error('Server startup error:', err);
    process.exit(1); // Exit with failure
});

