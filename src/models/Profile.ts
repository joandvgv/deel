import { Table, Model, Column, AllowNull, HasMany } from "sequelize-typescript";
import types from "../dataTypes";
import Contract from "./Contract";

export enum ProfileType {
  client = "client",
  contractor = "contractor",
}

@Table({
  modelName: "Profile",
})
export default class Profile extends Model {
  @AllowNull(false)
  @Column({ type: types.string })
  firstName: string;

  @AllowNull(false)
  @Column({ type: types.string })
  lastName: string;

  @AllowNull(false)
  @Column({ type: types.string })
  profession: string;

  @Column({
    type: types.decimal,
  })
  balance: number;

  @Column({ type: types.enum(ProfileType) })
  type: ProfileType;

  @HasMany(() => Contract)
  contracts: Contract[];
}
