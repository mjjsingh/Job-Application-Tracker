const app = require('./app'); 
const models = require('./backend/models'); 

const PORT = process.env.PORT || 3000; 


models.sequelize.sync().then(() => {
  console.log('Database connected!');
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); 
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

