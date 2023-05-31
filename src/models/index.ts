import fs from 'fs';
import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';

import configJson from '../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db: { [key: string]: any } = {};

const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      !file.includes('.test.ts')
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
