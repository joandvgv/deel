import express from "express";
import { getProfile } from "../middleware/getProfile";
import Contract, { ContractStatus } from "../models/Contract";
import Job from "../models/Job";
const router = express.Router();

router.use(getProfile);

router.get("/jobs/unpaid", async (req, res) => {
  const { id: profileId, profileKey } = req.profile;

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

export default router;
