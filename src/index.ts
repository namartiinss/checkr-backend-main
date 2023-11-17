import "reflect-metadata";
require("dotenv").config();
import express from "express";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

AppDataSource.initialize().then(async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(routes);
  app.listen(process.env.PORT || 3333);
});
