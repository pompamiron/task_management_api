import express from "express";
import sequelize from "./config/database";
import routes from "./routes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/", routes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models synchronized with the database.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
