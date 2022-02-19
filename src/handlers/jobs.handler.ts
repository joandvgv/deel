import Contract, { ContractStatus } from "../models/Contract";
import Job from "../models/Job";
import Profile from "../models/Profile";

export default class JobHandler {
  static async getUnpaid(profileId: number, profileKey: string) {
    const contracts = await Contract.findAll({
      where: {
        [profileKey]: profileId,
        status: ContractStatus.inProgress,
      },
      include: {
        model: Job,
        required: true,
        where: {
          paid: false,
        },
      },
    });
    return contracts?.flatMap(({ jobs: item }) => item) ?? [];
  }

  static async getById(
    id: number | string,
    profileId?: number,
    profileKey?: string
  ) {
    const includeContractDetails = !!(profileId && profileKey);

    const includeOptions = includeContractDetails
      ? {
          model: Contract,
          required: true,
          where: {
            [profileKey]: profileId,
          },
          include: [
            { model: Profile, as: "contractor" },
            { model: Profile, as: "client" },
          ],
        }
      : undefined;

    return Job.findOne({
      where: {
        id,
      },
      include: includeOptions,
    });
  }
}
