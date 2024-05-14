import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';

import { CustomerSequelizeRepository } from './customer-sequelize.repository';
import { CustomerModel } from './customer.model';

import { Customer } from 'src/internal/domain/customers/entities/customer.entity';

let customerModel: typeof CustomerModel;
let repository: ICustomerRepository;

describe('Customer Sequelize Repository', () => {
  beforeAll(async () => {
    await initDatabase();
    customerModel = CustomerModel;
    repository = new CustomerSequelizeRepository(customerModel);
  });
  afterAll(async () => closeDatabase());

  describe('findOne', () => {
    it('should get customer by customerId', async () => {
      // arrange
      const methodName = 'findOne';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '1',
      });

      // act
      const customer = await repository.findOne(customerId + methodName);

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('findOneByCpfOrEmail', () => {
    it('should get customer by cpf or email', async () => {
      // arrange
      const methodName = 'findOneByCpfOrEmail';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '2',
      });

      // act
      const customerByCpf = await repository.findOneByCpfOrEmail(cpf + '2');
      // const customerByEmail = await repository.findOneByCpfOrEmail('test@test.' + methodName);

      // assert
      expect(customerByCpf).not.toBeUndefined();
      expect(customerByCpf).not.toBeNull();
      // expect(customerByEmail).not.toBeUndefined();
      // expect(customerByEmail).not.toBeNull();
    });
  });

  describe('findByCpf', () => {
    it('should get customer by cpf', async () => {
      // arrange
      const methodName = 'findByCpf';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '3',
      });

      // act
      const customer = await repository.findByCpf(cpf + '3');

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('findAll', () => {
    it('should get all customers', async () => {
      // arrange
      const methodName = 'findAll';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '4',
      });

      // act
      const customers: Customer[] = await repository.findAll();

      // assert
      expect(customers).not.toBeUndefined();
      expect(customers).not.toBeNull();
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      // arrange
      const methodName = 'create';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      let customerEntity: Customer = new Customer({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '5',
      });

      // act
      await repository.create(customerEntity);
      const customer = await repository.findOne(customerId + methodName);

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('update', () => {
    it('should update an customer', async () => {
      // arrange
      const methodName = 'update';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '6',
      });


      let customerEntity = new Customer({
        id: customerId + methodName,
        name: 'Test updated',
      });

      // act
      await repository.update(customerId + methodName, customerEntity);
      const customerEntityUpdated = await repository.findOne(customerId + methodName);

      // assert
      expect(customerEntityUpdated).not.toBeUndefined();
      expect(customerEntityUpdated).not.toBeNull();
      expect(customerEntityUpdated.name).toBe('Test updated');
    });
  });

  describe('delete', () => {
    it('should delete an customer', async () => {
      // arrange
      const methodName = 'delete';
      const customerId = 'abcd-efgh-ijkl';
      const cpf = '123456789';

      await customerModel.create({
        id: customerId + methodName,
        name: 'Test',
        email: 'test@test.' + methodName,
        cpf: cpf + '7',
      });

      // act
      await repository.delete(customerId + methodName);
      const customerEntity = await repository.findOne(customerId);

      // assert
      expect(customerEntity).toBeNull();
    });
  });
});
