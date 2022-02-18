import { Request } from "express";
import { sequelize } from "../database";

export const getModels = (req: Request) =>
  req.app.get("models") as typeof sequelize.models;
