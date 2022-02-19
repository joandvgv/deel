import { Op, WhereAttributeHash } from "sequelize";
import Contract, { ContractStatus } from "../models/Contract";

export default class ContractsHandler {
  static getById(id: number | string, profileId: number, profileKey: string) {
    return Contract.findOne({
      where: { id, [profileKey]: profileId },
    });
  }

  static async getAllByProfile(
    profileId: number,
    profileKey: string,
    status: WhereAttributeHash = { [Op.not]: ContractStatus.terminated }
  ) {
    return Contract.findAll({
      where: {
        [profileKey]: profileId,
        status,
      },
    });
  }
}
