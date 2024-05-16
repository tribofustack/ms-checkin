import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FindCustomerByCpf } from './find-by-cpf.usecase';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { CustomerSequelizeRepository } from 'src/external/adapters/customer/sequelize/customer-sequelize.repository';
import { CustomerModel } from 'src/external/adapters/customer/sequelize/customer.model';
import { v4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';

describe('FindCustomerByCpf', () => {
  let findCustomerByCpf: FindCustomerByCpf;
  let idGeneratorMock: jest.Mocked<IIdentifierGenerator>;
  let customerModel: typeof CustomerModel;
  let repository: ICustomerRepository;

  beforeAll(async () => {
    await initDatabase();
    customerModel = CustomerModel;
    repository = new CustomerSequelizeRepository(customerModel);
  });

  afterAll(async () => closeDatabase());

  beforeEach(async () => {
    idGeneratorMock = {
      generate: jest.fn().mockReturnValue(v4()),
    } as unknown as jest.Mocked<IIdentifierGenerator>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCustomerByCpf,
        { provide: 'CustomerRepository', useValue: repository },
        { provide: 'IdGenerator', useValue: idGeneratorMock },
      ],
    }).compile();

    findCustomerByCpf = module.get<FindCustomerByCpf>(FindCustomerByCpf);
  });

  describe('execute', () => {
    it('should find customer by CPF', async () => {
        // Data
        const createCustomerDto: CreateCustomerDto = {
          id: '00000000002',
          name: 'Test User2',
          email: 'test2@example.com',
          cpf: '00000000002',
        };
        
        CustomerModel.create(createCustomerDto);

        // Test
        createCustomerDto.name = 'Test User Updated';
        const result = await findCustomerByCpf.execute(createCustomerDto.id);

        // assert
        expect(result).not.toBe(null);
    });
    it('should not find customer by CPF', async () => {
        // Test
        let customer: Customer;
        try {
            customer = await findCustomerByCpf.execute('abc');
        } catch (error) {
            // assert
            expect(error).toBeTruthy();
            expect(error.message).toBe('Customer not found');
            expect(error).toBeInstanceOf(NotFoundException);
          }
          expect(customer).toBeFalsy();
    });
  });
});
