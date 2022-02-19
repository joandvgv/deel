import Profile from "../models/Profile";

export default class ProfilesHandler {
  static async getById(profileId: number | string) {
    return Profile.findOne({
      where: { id: profileId },
    });
  }
}
