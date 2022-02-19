import express from "express";
import { getProfile } from "../middleware/getProfile";
import ContractsHandler from "./../handlers/contracts.handler";
const router = express.Router();

router.use(getProfile);

router.get("/contracts/:id", async (req, res) => {
  const { id } = req.params;
  const { id: profileId, profileKey } = req.profile;

  const contract = await ContractsHandler.getById(id, profileId, profileKey);

  if (!contract) return res.status(404).end();

  res.json(contract);
});

router.get("/contracts", async (req, res) => {
  const { id: profileId, profileKey } = req.profile;

  const contracts = await ContractsHandler.getAllByProfile(
    profileId,
    profileKey
  );
  res.json({ contracts });
});

export default router;
