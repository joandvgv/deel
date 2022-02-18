import { Table, Model, Column, AllowNull, HasMany } from "sequelize-typescript";
import types from "../dataTypes";
import Contract from "./Contract";
import "reflect-metadata";

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

  @Column({ type: types.enum("client", "contractor") })
  type: "client" | "contractor";

  @HasMany(() => Contract)
  contracts: Contract[];
}
