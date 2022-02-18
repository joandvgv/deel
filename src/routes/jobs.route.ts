import express from "express";
import { Op } from "sequelize";
import { getProfile } from "../middleware/getProfile";
import Contract, { ContractStatus } from "../models/Contract";
import Job from "../models/Job";
const router = express.Router();

router.use(getProfile);

router.get("/jobs/unpaid", async (req, res) => {
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

  const jobs = contracts?.flatMap(({ jobs: item }) => item) ?? [];

  res.json({ jobs });
});

router.get("/contracts", async (req, res) => {
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