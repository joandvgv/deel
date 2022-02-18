import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database";
const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

import ContractRoute from "./routes/contract.route";
import JobsRoute from "./routes/jobs.route";

app.use("/", ContractRoute);
app.use("/", JobsRoute);

export default app;
