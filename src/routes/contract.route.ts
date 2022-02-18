import express from "express";
import { Op } from "sequelize";
import { getProfile } from "../middleware/getProfile";
import { ContractStatus } from "../models/Contract";
import { getModels } from "../utils/models";
const router = express.Router();

router.use(getProfile);

router.get("/contracts/:id", async (req, res) => {
  const { Contract } = getModels(req);
  const { id } = req.params;
  const clientId = req.profile.id;

  const contract = await Contract.findOne({
    where: { id, ClientId: clientId },
  });

  if (!contract) return res.status(404).end();

  res.json(contract);
});

router.get("/contracts", async (req, res) => {
  const { Contract } = getModels(req);
  const clientId = req.profile.id;

  const contracts = await Contract.findAll({
    where: {
      ClientId: clientId,
      status: { [Op.not]: ContractStatus.terminated },
    },
  });

  res.json({ contracts });
});

export default router;
