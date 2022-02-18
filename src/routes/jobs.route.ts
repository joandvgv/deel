import express from "express";
import { Op } from "sequelize";
import { getProfile } from "../middleware/getProfile";
import { ContractStatus } from "../models/Contract";
import { getModels } from "../utils/models";
const router = express.Router();

router.use(getProfile);

router.get("/jobs/unpaid", async (req, res) => {
  const { Contract, Job } = getModels(req);
  const clientId = req.profile.id;

  const contracts = await Contract.findAll({
    where: {
      ClientId: clientId,
      status: { [Op.not]: ContractStatus.terminated },
    },
    include: {
      model: Job,
      required: true,
      where: {
        paid: false,
      },
    },
  });

  const jobs =
    contracts?.flatMap((contract) => contract.getDataValue("jobs")) ?? [];

  res.json({ jobs });
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
