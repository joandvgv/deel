import express from "express";

import { isValidDate } from "./../utils/date";
import JobsHandler from "./../handlers/jobs.handler";
import { ProfileType } from "../models/Profile";
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

  const [contractor] = await JobsHandler.getTopProfiles(
    start,
    end,
    ProfileType.contractor,
    1
  );

  if (!contractor) return res.status(404).end();

  return res.json({ profession: contractor.profession });
});

router.get("/best-clients", async (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-CA");

  const { start = currentDate, end = currentDate } = req.query as Record<
    string,
    string
  >;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 2;

  const validRange = isValidDate(start) && isValidDate(end);

  if (!validRange || Number.isNaN(limit)) {
    return res.status(400).json({ error: "Malformed Payload" });
  }

  const clients = await JobsHandler.getTopProfiles(
    start,
    end,
    ProfileType.client,
    limit
  );

  return res.json({
    clients: clients.map((client) => ({
      id: client.id,
      fullName: client.fullName,
      paid: client.paid,
    })),
  });
});

export default router;
