import express from "express";
import { Op } from "sequelize";
import { getProfile } from "../middleware/getProfile";
import Contract, { ContractStatus } from "../models/Contract";
const router = express.Router();

router.use(getProfile);

router.get("/contracts/:id", async (req, res) => {
  const { id } = req.params;
  const { id: profileId, profileKey } = req.profile;

  const contract = await Contract.findOne({
    where: { id, [profileKey]: profileId },
  });

  if (!contract) return res.status(404).end();

  res.json(contract);
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
