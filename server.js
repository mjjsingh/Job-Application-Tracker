const app = require('./app'); 
const db = require('./backend/models'); 
const PORT = process.env.PORT || 4000; 

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        return db.sequelize.sync({ force: false }); // Set force: true if you want to drop tables and recreate them on every server start
    })
    .then(() => {
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

