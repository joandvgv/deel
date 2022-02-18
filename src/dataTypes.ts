import { DataType } from "sequelize-typescript";

export default {
  decimal: DataType.DECIMAL(12, 2),
  enum: <T extends object>(arg: T) => DataType.ENUM(...Object.values(arg)),
  string: DataType.STRING,
  boolean: DataType.BOOLEAN,
  date: DataType.DATE,
  bigint: DataType.BIGINT,
  virtual: DataType.VIRTUAL,
};
