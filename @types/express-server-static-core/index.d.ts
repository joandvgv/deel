import Profile from "../../src/models/Profile";

// Get profile middleware appends Profile type to Express request -
// Adding it globally to avoid extending its type every time
declare global {
  namespace Express {
    interface Request {
      profile: Profile;
    }
  }
}
