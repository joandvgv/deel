import sqlite3 from "sqlite3";
import { Sequelize } from "sequelize-typescript";
import cls from "cls-hooked";
import path from "path";
const namespace = cls.createNamespace("sequelize-transactions");

Sequelize.useCLS(namespace); // allows to use transactions w/o passing it to every call inside trans block

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
  dialectModule: sqlite3,
  models: [path.join(__dirname, "..", "models")],
});
