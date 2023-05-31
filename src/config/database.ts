import { Sequelize } from "sequelize";

const getDatabaseConfig = (environment: string) => {
  if (environment === "development") {
    return {
      database: "task_management",
      username: "postgres",
      password: "123456",
      host: "localhost",
      dialect: "postgres",
    };
  } else if (environment === "test") {
    return {
      database: "task_management_test",
      username: "postgres",
      password: "123456",
      host: "localhost",
      dialect: "postgres",
    };
  } else {
    throw new Error(`Invalid environment: ${environment}`);
  }
};

const environment = process.env.NODE_ENV || "development";
const databaseConfig = getDatabaseConfig(environment);

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: "postgres",
  }
);

export default sequelize;
