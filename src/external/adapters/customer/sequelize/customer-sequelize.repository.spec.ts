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
      const customerId = 'abcd-efgh-ijkl-findOne';
      const cpf = '1234567891';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.findOne',
        cpf: cpf,
      });

      // act
      const customer = await repository.findOne(customerId);

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('findOneByCpfOrEmail', () => {
    it('should get customer by cpf or email', async () => {
      // arrange
      const customerId = 'abcd-efgh-ijkl-findOneByCpfOrEmail';
      const cpf = '1234567892';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.findOneByCpfOrEmail',
        cpf: cpf,
      });

      // act
      const customerByCpf = await repository.findOneByCpfOrEmail(cpf);
      // const customerByEmail = await repository.findOneByCpfOrEmail('test@test.findOneByCpfOrEmail');

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
      const customerId = 'abcd-efgh-ijkl-findByCpf';
      const cpf = '1234567893';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.findByCpf',
        cpf: cpf,
      });

      // act
      const customer = await repository.findByCpf(cpf);

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('findAll', () => {
    it('should get all customers', async () => {
      // arrange
      const customerId = 'abcd-efgh-ijkl-findAll';
      const cpf = '1234567894';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.findAll',
        cpf: cpf,
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
      const customerId = 'abcd-efgh-ijkl-create';
      const cpf = '1234567895';

      let customerEntity: Customer = new Customer({
        id: customerId,
        name: 'Test',
        email: 'test@test.create',
        cpf: cpf,
      });

      // act
      await repository.create(customerEntity);
      const customer = await repository.findOne(customerId);

      // assert
      expect(customer).not.toBeUndefined();
      expect(customer).not.toBeNull();
    });
  });

  describe('update', () => {
    it('should update an customer', async () => {
      // arrange
      const customerId = 'abcd-efgh-ijkl-update';
      const cpf = '1234567896';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.update',
        cpf: cpf,
      });


      let customerEntity = new Customer({
        id: customerId,
        name: 'Test updated',
      });

      // act
      await repository.update(customerId, customerEntity);
      const customerEntityUpdated = await repository.findOne(customerId);

      // assert
      expect(customerEntityUpdated).not.toBeUndefined();
      expect(customerEntityUpdated).not.toBeNull();
      expect(customerEntityUpdated.name).toBe('Test updated');
    });
  });

  describe('delete', () => {
    it('should delete an customer', async () => {
      // arrange
      const customerId = 'abcd-efgh-ijkl-delete';
      const cpf = '1234567897';

      await customerModel.create({
        id: customerId,
        name: 'Test',
        email: 'test@test.delete',
        cpf: cpf,
      });

      // act
      await repository.delete(customerId);
      const customerEntity = await repository.findOne(customerId);

      // assert
      expect(customerEntity).toBeNull();
    });
  });
});
