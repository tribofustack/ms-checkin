import { closeDatabase, initDatabase } from 'src/external/infra/database/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProduct } from './update-product.usecase';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { ProductSequelizeRepository } from 'src/external/adapters/product/sequelize/product-sequelize.repository';
import { ProductModel } from 'src/external/adapters/product/sequelize/product.model';
import { CategoryModel } from 'src/external/adapters/product/sequelize/category.model';
import { v4 } from 'uuid';

describe('CreateProduct', () => {
  let updateProduct: UpdateProduct;
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
        UpdateProduct,
        { provide: 'ProductRepository', useValue: repository },
        { provide: 'IdGenerator', useValue: idGeneratorMock },
      ],
    }).compile();

    updateProduct = module.get<UpdateProduct>(UpdateProduct);
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
        id: 'test-update-product-id',
        name: 'Test',
        description: 'Test',
        categoryId: 'lanche-category-id',
        price: 10,
        quantity: 10,    
      });

      const updateProductDto: UpdateProductDto = {
        name: 'Test updated',
        description: 'Test',
        categoryId: 'lanche-category-id',
        price: 10,
        quantity: 10,
      };

      // Test
      await updateProduct.execute('test-update-product-id', updateProductDto);

      // Validate
      const productUpdated = await ProductModel.findOne({ where: { id: 'test-update-product-id' } });
      expect(productUpdated.name).toBe('Test updated');
    });
  });
});
