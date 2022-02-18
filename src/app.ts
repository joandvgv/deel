import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database";
const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

import ContractRoute from "./routes/contract.route";

app.use("/", ContractRoute);

export default app;
