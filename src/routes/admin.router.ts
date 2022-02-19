import express from "express";

import { isValidDate } from "./../utils/date";
import JobsHandler from "./../handlers/jobs.handler";
const router = express.Router();

router.get("/best-profession", async (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-CA");

  const { start = currentDate, end = currentDate } = req.query as Record<
    string,
    string
  >;

  if (!isValidDate(start) || !isValidDate(end)) {
    return res.status(400).json({ error: "Malformed Payload" });
  }

  const contractor = await JobsHandler.getTopEarner(start, end);

  if (!contractor) return res.status(404);

  return res.json({ profession: contractor.profession });
});

export default router;
