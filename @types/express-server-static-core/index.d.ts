import Profile from "../../src/models/Profile";

declare global {
  namespace Express {
    interface Request {
      profile: Profile;
    }
  }
}
