import express from "express";
import { sequelize } from "../database";
import { getProfile } from "../middleware/getProfile";
import JobHandler from "./../handlers/jobs.handler";
const router = express.Router();

router.use(getProfile);

router.get("/jobs/unpaid", async (req, res) => {
  const { id: profileId, profileKey } = req.profile;
  const jobs = await JobHandler.getUnpaid(profileId, profileKey);

  res.json({ jobs });
});

router.post("/jobs/:job_id/pay", async (req, res) => {
  const jobId = req.params.job_id;
  const { id: profileId, balance } = req.profile;
  const job = await JobHandler.getById(jobId, profileId, "ClientId");

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
