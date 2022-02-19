import express from "express";
import { sequelize } from "../database";
import { getProfile } from "../middleware/getProfile";
import Contract, { ContractStatus } from "../models/Contract";
import Job from "../models/Job";
import Profile from "../models/Profile";
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

router.post("/jobs/:job_id/pay", async (req, res) => {
  const jobId = req.params.job_id;
  const { id: profileId, balance } = req.profile;
  const job = await Job.findOne({
    where: {
      id: jobId,
    },
    include: {
      model: Contract,
      required: true,
      where: {
        ClientId: profileId,
      },
      include: [
        { model: Profile, as: "contractor" },
        { model: Profile, as: "client" },
      ],
    },
  });

  if (!job) return res.status(404).end();

  if (job.paid) return res.status(422).json({ error: "Job is already paid" });

  if (balance < job.price)
    return res.status(422).json({ error: "Insufficient funds" });

  const { contractor, client } = job.contract;

  await sequelize.transaction(async () => {
    job.paid = true;
    await contractor.increment("balance", { by: job.price });
    await client.decrement("balance", { by: job.price });
    await client.save();
    await job.save();
  });

  res.json({ job });
});

export default router;
