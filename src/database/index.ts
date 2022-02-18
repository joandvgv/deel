import sqlite3 from "sqlite3";
import { Sequelize } from "sequelize-typescript";
import path from "path";

console.log(__dirname + "/models");
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
  dialectModule: sqlite3,
  models: [path.join(__dirname, "..", "models")],
});
