import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

import { CustomerController } from './customer.controller';
import { CustomerSequelizeRepository } from './sequelize/customer-sequelize.repository';
import { CustomerModel } from './sequelize/customer.model';
import { FindCustomerById } from 'src/internal/application/useCases/customer/find-by-id.usecase';
import { CreateCustomer } from 'src/internal/application/useCases/customer/create-customer.usecase';
import { FindCustomerByCpf } from 'src/internal/application/useCases/customer/find-by-cpf.usecase';

@Module({
  imports: [SequelizeModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [
    CustomerSequelizeRepository,
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CreateCustomer,
    FindCustomerByCpf,
    FindCustomerById
  ],
})
export class CustomerModule { }
