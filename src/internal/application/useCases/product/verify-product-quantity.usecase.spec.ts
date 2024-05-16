import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { VerifyProductDto } from 'src/internal/domain/product/dto/verify-product.dto';
import { VerifyProductQuantity } from './verify-product-quantity.usecase';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { ProductSequelizeRepository } from 'src/external/adapters/product/sequelize/product-sequelize.repository';
import { ProductModel } from 'src/external/adapters/product/sequelize/product.model';
import { CategoryModel } from 'src/external/adapters/product/sequelize/category.model';
import { IEventEmitter } from '../../ports/events/event';

describe('CreateProduct', () => {
  let verifyProductQuantity: VerifyProductQuantity;
  let eventEmitter: jest.Mocked<IEventEmitter>;
  let productModel: typeof ProductModel;
  let categoryModel: typeof CategoryModel;
  let repository: IProductRepository;

  beforeAll(async () => {
    await initDatabase();
    productModel = ProductModel;
    categoryModel = CategoryModel;
    repository = new ProductSequelizeRepository(productModel, categoryModel);
  });

  afterAll(async () => closeDatabase());

  beforeEach(async () => {
    eventEmitter = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<IEventEmitter>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyProductQuantity,
        { provide: 'ProductRepository', useValue: repository },
        { provide: 'EventEmitter', useValue: eventEmitter },
      ],
    }).compile();

    verifyProductQuantity = module.get<VerifyProductQuantity>(VerifyProductQuantity);
  });

  describe('execute', () => {
    it('should create a new product', async () => {
      // Data
      await categoryModel.create({
        id: 'lanche-category-id',
        name: 'Lanche',        
        description: 'description-name-test',        
      });

      await productModel.create({
        id: 'test-delete-product-id',
        name: 'Test',
        description: 'Test',
        categoryId: 'lanche-category-id',
        price: 10,
        quantity: 10,    
      });

      const products: VerifyProductDto[] = [{
        id: 'test-delete-product-id',
        quantity: 10,
        price: 10,
      }];

      // Test
      const result = await verifyProductQuantity.execute(products);

      // Validate
      expect(result).not.toBe(null);
    });
  });
});
