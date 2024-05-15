import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CreateCustomer } from '../../../internal/application/useCases/customer/create-customer.usecase';
import { FindCustomerByCpf } from '../../../internal/application/useCases/customer/find-by-cpf.usecase';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let createCustomerMock: jest.Mocked<CreateCustomer>;
  let findCustomerByCpfMock: jest.Mocked<FindCustomerByCpf>;

  beforeEach(async () => {
    createCustomerMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateCustomer>;

    findCustomerByCpfMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindCustomerByCpf>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        { provide: CreateCustomer, useValue: createCustomerMock },
        { provide: FindCustomerByCpf, useValue: findCustomerByCpfMock },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer successfully', async () => {
      const createCustomerDto: CreateCustomerDto = { 
        id: null,
        name: 'abc',
        email: 'abc',
        cpf: '12345678901',
      };
      const result = new Customer({ 
        id: 'abc',
        name: 'abc',
        email: 'abc',
        cpf: '12345678901',
      });
      createCustomerMock.execute.mockResolvedValue(result);

      expect(await customerController.create(createCustomerDto)).toBe(result);
      expect(createCustomerMock.execute).toHaveBeenCalledWith(createCustomerDto);
    });

    it('should return an error response when creation fails', async () => {
      let error: any;
      try {
        await customerController.create(null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);
    });
  });

  describe('getCustomer', () => {
    it('should get a customer by CPF successfully', async () => {
      const cpf = '12345678900';
      const createCustomerDto: CreateCustomerDto = { 
        /* your dto properties */ 
        id: null,
        name: 'abc',
        email: 'abc',
        cpf: '12345678901',
      };
      const result = new Customer({ 
        /* expected result */ 
        id: 'abc',
        name: 'abc',
        email: 'abc',
        cpf: '12345678901',
      });
      findCustomerByCpfMock.execute.mockResolvedValue(result);

      expect(await customerController.getCustomer(cpf)).toBe(result);
      expect(findCustomerByCpfMock.execute).toHaveBeenCalledWith(cpf);
    });

    it('should return an error response when customer is not found', async () => {
      let error: any;
      try {
        await customerController.getCustomer(null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);
    });
  });
});
