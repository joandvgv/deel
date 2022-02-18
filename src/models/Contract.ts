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

  @Column({ type: types.enum(ContractStatus) })
  status: ContractStatus;

  @ForeignKey(() => Profile)
  @Column({ type: types.bigint })
  ClientId: number;

  @ForeignKey(() => Profile)
  @Column({ type: types.bigint })
  ContractorId: number;

  @BelongsTo(() => Profile)
  client: Profile;

  @BelongsTo(() => Profile)
  contractor: Profile;

  @HasMany(() => Job)
  jobs: Job[];
}
