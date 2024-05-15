import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from 'src/external/adapters/customer/sequelize/customer.model';
import { ProductModel } from 'src/external/adapters/product/sequelize/product.model';
import { DatabaseException } from 'src/internal/application/errors';

import { connection } from './connections';
import { CategoryModel } from 'src/external/adapters/product/sequelize/category.model';

export const sequelizeModels = [
  CustomerModel,
  ProductModel,
  CategoryModel,
];

export const sequelizeModule = SequelizeModule.forRoot({
  ...connection,
  models: sequelizeModels,
} as SequelizeModuleOptions);

let sequelize: Sequelize | null;

export const initDatabase = async () => {
  if(sequelize) return sequelize
  
  sequelize = new Sequelize(connection as SequelizeModuleOptions);

  await sequelize.authenticate({ logging: false });

  sequelize.addModels(sequelizeModels);
  // await sequelize.sync({ force: true });

  return sequelize;
};

export const closeDatabase = async (): Promise<void> => {
  if (!sequelize) throw new DatabaseException('Sequelize connection not exists.');

  await sequelize.close();
  sequelize = null;
};

export const databaseStatus = (): any => {
  return sequelizeModule
}