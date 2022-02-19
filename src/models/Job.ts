import {
  Table,
  Model,
  Column,
  AllowNull,
  Default,
  ForeignKey,
  BelongsTo,
  BeforeUpdate,
} from "sequelize-typescript";
import types from "../dataTypes";
import Contract from "./Contract";

@Table({
  modelName: "Job",
})
export default class Job extends Model {
  @AllowNull(false)
  @Column({ type: types.string })
  description: string;

  @AllowNull(false)
  @Column({ type: types.decimal })
  price: number;

  @Default(false)
  @Column({ type: types.boolean })
  paid: boolean;

  @Column({ type: types.date })
  paymentDate: Date;

  @ForeignKey(() => Contract)
  @Column({ type: types.bigint })
  ContractId: number;

  @BelongsTo(() => Contract)
  contract: Contract;

  @BeforeUpdate
  static verifyPayment(instance: Job) {
    if (instance.paid && !instance.paymentDate) {
      instance.paymentDate = new Date();
    }
  }
}
