import express from 'express';
import sequelize from './config/database';

const app = express();
const port = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
