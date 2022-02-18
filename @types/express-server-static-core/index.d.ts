/* eslint-disable no-unused-vars */
import { Profile } from "../../src/model";

declare global {
  namespace Express {
    interface Request {
      profile: Profile;
    }
  }
}
