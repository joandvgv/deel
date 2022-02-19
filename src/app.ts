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
import AdminRouter from "./routes/admin.router";

app.use("/contracts", ContractsRouter);
app.use("/jobs", JobsRouter);
app.use("/balances", BalancesRouter);
app.use("/admin", AdminRouter);

export default app;
