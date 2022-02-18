import {
  Table,
  Model,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import types from "../dataTypes";
import Profile from "./Profile";
import Job from "./Job";

export enum ContractStatus {
  new = "new",
  inProgress = "in_progress",
  terminated = "terminated",
}

@Table({
  modelName: "Contract",
})
export default class Contract extends Model {
  @AllowNull(false)
  @Column({ type: types.string })
  terms: string;

  @Column({ type: types.enum("new", "in_progress", "terminated") })
  status: ContractStatus;

  @ForeignKey(() => Profile)
  @Column({ type: types.bigint })
  ClientId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @HasMany(() => Job)
  contracts: Job[];
}
