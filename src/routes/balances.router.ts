import express from "express";
import { getProfile } from "../middleware/getProfile";
import JobHandler from "./../handlers/jobs.handler";
const router = express.Router();

router.use(getProfile);

router.post("/deposit/:userId", async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  const { id: profileId, profileKey } = req.profile;

  if (!amount) {
    return res.status(400).json({ error: "Malformed Payload" });
  }

  if (userId != profileId) {
    return res.status(403).json({ error: "Insufficient permissions" });
  }

  const jobs = await JobHandler.getUnpaid(profileId, profileKey);

  const total = jobs.reduce((acc, job) => acc + job.price, 0);
  const maxAllowedToDeposit = (25 / 100) * total;

  if (amount > maxAllowedToDeposit)
    return res
      .status(422)
      .json({ error: "Can't exceed amount allowed to deposit" });

  await req.profile.increment("balance", { by: amount });
  return res.json({ profile: req.profile });
});

export default router;
