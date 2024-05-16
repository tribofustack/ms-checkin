import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomer } from './create-customer.usecase';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { CustomerSequelizeRepository } from 'src/external/adapters/customer/sequelize/customer-sequelize.repository';
import { CustomerModel } from 'src/external/adapters/customer/sequelize/customer.model';
import { v4 } from 'uuid';

describe('CreateCustomer', () => {
  let createCustomer: CreateCustomer;
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
        CreateCustomer,
        { provide: 'CustomerRepository', useValue: repository },
        { provide: 'IdGenerator', useValue: idGeneratorMock },
      ],
    }).compile();

    createCustomer = module.get<CreateCustomer>(CreateCustomer);
  });

  describe('execute', () => {
    it('should create a new customer when none exists', async () => {
      // Data
      const createCustomerDto: CreateCustomerDto = {
        name: 'Test User',
        email: 'test@example.com',
        cpf: '00000000001',
      };

      // Test
      const result = await createCustomer.execute(createCustomerDto);

      // Validate
      const customerModel = await CustomerModel.findOne({ where: { id: result.id } });
      expect(customerModel.id).not.toBe(null);
    });
    it('should update a customer', async () => {
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
        const result = await createCustomer.execute(createCustomerDto);
  
        // Validate
        const customerModel = await CustomerModel.findOne({ where: { id: result.id } });
        expect(customerModel.name).toBe('Test User Updated');
      });
  });
});
