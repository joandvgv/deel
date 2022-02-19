import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database";
const app = express();
app.use(bodyParser.json());

app.set("sequelize", sequelize);
import ContractsRouter from "./routes/contracts.router";
import JobsRouter from "./routes/jobs.router";
import BalancesRouter from "./routes/balances.router";

app.use("/contracts", ContractsRouter);
app.use("/jobs", JobsRouter);
app.use("/balances", BalancesRouter);

export default app;
