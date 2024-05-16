import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProduct } from './delete-product.usecase';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { ProductSequelizeRepository } from 'src/external/adapters/product/sequelize/product-sequelize.repository';
import { ProductModel } from 'src/external/adapters/product/sequelize/product.model';
import { CategoryModel } from 'src/external/adapters/product/sequelize/category.model';
import { v4 } from 'uuid';

describe('CreateProduct', () => {
  let deleteProduct: DeleteProduct;
  let idGeneratorMock: jest.Mocked<IIdentifierGenerator>;
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
    idGeneratorMock = {
      generate: jest.fn().mockReturnValue(v4()),
    } as unknown as jest.Mocked<IIdentifierGenerator>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProduct,
        { provide: 'ProductRepository', useValue: repository },
        { provide: 'IdGenerator', useValue: idGeneratorMock },
      ],
    }).compile();

    deleteProduct = module.get<DeleteProduct>(DeleteProduct);
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

      // Test
      await deleteProduct.execute('test-delete-product-id');

      // Validate
      const product = await ProductModel.findOne({ where: { id: 'test-delete-product-id' } });
      expect(product).toBe(null);
    });
  });
});
