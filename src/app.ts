import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database";
import { getProfile } from "./middleware/getProfile";
const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

type Models = typeof sequelize.models;
/**
 * FIX ME!
 * @returns contract by id
 */
app.get("/contracts/:id", getProfile, async (req, res) => {
  const { Contract } = req.app.get("models") as Models;
  const { id } = req.params;
  const clientId = req.profile.id;

  const contract = await Contract.findOne({
    where: { id, ClientId: clientId },
  });

  if (!contract) return res.status(404).end();

  res.json(contract);
});
module.exports = app;
