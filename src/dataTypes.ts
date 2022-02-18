import { DataType } from "sequelize-typescript";

export default {
  decimal: DataType.DECIMAL(12, 2),
  enum: (...args: string[]) => DataType.ENUM(...args),
  string: DataType.STRING,
  boolean: DataType.BOOLEAN,
  date: DataType.DATE,
  bigint: DataType.BIGINT,
};
