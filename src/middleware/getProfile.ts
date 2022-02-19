import { RequestHandler } from "express";
import ProfilesHandler from "./../handlers/profiles.handler";

const getProfile: RequestHandler = async (req, res, next) => {
  const profileId = req.get("profile_id") || 0;

  const profile = await ProfilesHandler.getById(profileId);

  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};
export { getProfile };
