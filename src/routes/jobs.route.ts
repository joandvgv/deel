import express from "express";
import { Op } from "sequelize";
import { getProfile } from "../middleware/getProfile";
import Contract, { ContractStatus } from "../models/Contract";
import { ProfileType } from "../models/Profile";
import Job from "../models/Job";
const router = express.Router();

router.use(getProfile);

router.get("/jobs/unpaid", async (req, res) => {
  const { id: profileId, type: profileType } = req.profile;

  const typeMap = {
    [ProfileType.client]: "ClientId",
    [ProfileType.contractor]: "ContractorId",
  };
  const profileKey = typeMap[profileType];

  const contracts = await Contract.findAll({
    where: {
      [profileKey]: profileId,
      status: ContractStatus.inProgress,
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
