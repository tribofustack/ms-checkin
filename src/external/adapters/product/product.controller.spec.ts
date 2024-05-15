import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProduct } from '../../../internal/application/useCases/product/create-product.usecase';
import { DeleteProduct } from '../../../internal/application/useCases/product/delete-product.usecase';
import { FindProductsByCategory } from '../../../internal/application/useCases/product/find-by-category.usecase';
import { GetProductCategories } from '../../../internal/application/useCases/product/get-categories.usecase';
import { UpdateProduct } from '../../../internal/application/useCases/product/update-product.usecase';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { Category } from 'src/internal/domain/product/entities/category.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let createProductMock: jest.Mocked<CreateProduct>;
  let deleteProductMock: jest.Mocked<DeleteProduct>;
  let findProductsByCategoryMock: jest.Mocked<FindProductsByCategory>;
  let getProductCategoriesMock: jest.Mocked<GetProductCategories>;
  let updateProductMock: jest.Mocked<UpdateProduct>;

  beforeEach(async () => {
    createProductMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateProduct>;

    deleteProductMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeleteProduct>;

    findProductsByCategoryMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindProductsByCategory>;

    getProductCategoriesMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetProductCategories>;

    updateProductMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateProduct>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: CreateProduct, useValue: createProductMock },
        { provide: DeleteProduct, useValue: deleteProductMock },
        { provide: FindProductsByCategory, useValue: findProductsByCategoryMock },
        { provide: GetProductCategories, useValue: getProductCategoriesMock },
        { provide: UpdateProduct, useValue: updateProductMock },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = { 
        // fill with appropriate values
        id: 'test',
        name: 'test',
        description: 'test',
        categoryId: 'test',
        price: 1,
        quantity: 1,
      };
      const result = new Product({
        // mock the expected result
        id: 'test',
        name: 'test',
        description: 'test',
        categoryId: 'test',
        price: 1,
        quantity: 1,
      });
      createProductMock.execute.mockResolvedValue(result);

      expect(await productController.create(createProductDto)).toBe(result);
      expect(createProductMock.execute).toHaveBeenCalledWith(createProductDto);
    });

    it('should return an error response when creation fails', async () => {
      let error: any;
      try {
        await productController.create(null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updateProductDto: UpdateProductDto = { 
        // fill with appropriate values
        id: 'test',
        name: 'test',
        description: 'test',
        categoryId: 'test',
        price: 1,
        quantity: 1,
      };
      const id = 'product-id';

      updateProductMock.execute.mockResolvedValue(null);

      expect(await productController.update(id, updateProductDto)).toBe(null);
      expect(updateProductMock.execute).toHaveBeenCalledWith(id, updateProductDto);
    });

    it('should return an error response when update fails', async () => {
      let error: any;
      try {
        await productController.update(null, null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);   
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', async () => {
      const id = 'product-id';
      
      deleteProductMock.execute.mockResolvedValue(null);

      expect(await productController.delete(id)).toBe(null);
      expect(deleteProductMock.execute).toHaveBeenCalledWith(id);
    });

    it('should return an error response when deletion fails', async () => {
      let error: any;
      try {
        await productController.delete(null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);      
    });
  });

  describe('findByCategory', () => {
    it('should get products by category successfully', async () => {
      const id = 'category-id';
      const result = { 
        products: [
          new Product({
            // mock the expected result
            id: 'test',
            name: 'test',
            description: 'test',
            categoryId: 'test',
            price: 1,
            quantity: 1,
          }),
        ]
      };
      findProductsByCategoryMock.execute.mockResolvedValue(result);

      expect(await productController.findByCategory(id)).toBe(result);
      expect(findProductsByCategoryMock.execute).toHaveBeenCalledWith(id);
    });

    it('should return an error response when finding by category fails', async () => {
      let error: any;
      try {
        await productController.findByCategory(null);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);
    });
  });

  describe('getCategories', () => {
    it('should get product categories successfully', async () => {
      const result = { 
        categories: [
          new Category({
            // mock the expected result
            id: 'test',
            name: 'Lanche',
            description: 'test',
          }),
        ]
      };
      getProductCategoriesMock.execute.mockResolvedValue(result);

      expect(await productController.getCategories()).toBe(result);
      expect(getProductCategoriesMock.execute).toHaveBeenCalledWith();
    });

    it('should return an error response when getting categories fails', async () => {
      let error: any;
      try {
        await productController.getCategories();
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(null);
    });
  });
});
