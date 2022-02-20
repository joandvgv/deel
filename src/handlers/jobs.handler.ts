import { Op } from "sequelize";
import { sequelize } from "../database";
import Contract, { ContractStatus } from "../models/Contract";
import Job from "../models/Job";
import Profile, { ProfileType } from "../models/Profile";

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

  static async getTopProfiles(
    start: string,
    end: string,
    type: keyof typeof ProfileType,
    limit: number
  ) {
    const groupingKeyMap: {
      [key in typeof type]: string;
    } = {
      client: "clientId",
      contractor: "contractor.profession",
    };

    const groupingKey = `Contract.${groupingKeyMap[type]}`;
    const aggregateKey = "total_amount";

    const jobs = await Job.findAll({
      where: {
        paid: true,
        paymentDate: {
          [Op.and]: {
            [Op.gte]: new Date(start),
            [Op.lte]: new Date(end).setUTCHours(23, 59, 59, 999),
          },
        },
      },
      attributes: [
        groupingKey,
        [sequelize.fn("sum", sequelize.col("price")), aggregateKey],
      ],
      include: {
        model: Contract,
        required: true,
        include: [{ model: Profile, as: type, required: true }],
      },
      group: [groupingKey],
      order: [[sequelize.literal(aggregateKey), "DESC"]],
      limit,
    });

    return jobs.map((job) => {
      const profile = job.contract[type];
      const amountKey = type === ProfileType.client ? "paid" : "earned";

      return {
        id: profile.id,
        fullName: profile.fullName,
        profession: profile.profession,
        balance: profile.balance,
        [amountKey]: job.getDataValue("total_amount"),
      };
    });
  }
}
