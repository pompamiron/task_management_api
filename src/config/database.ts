import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_management", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
