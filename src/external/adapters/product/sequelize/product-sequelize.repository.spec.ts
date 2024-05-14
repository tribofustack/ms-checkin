import {
  closeDatabase,
  initDatabase,
} from 'src/external/infra/database/sequelize';
import { IProductRepository, categoriesToCreate } from 'src/internal/domain/product/repositories/product.repository';

import { ProductSequelizeRepository } from './product-sequelize.repository';
import { ProductModel } from './product.model';
import { CategoryModel } from './category.model';
import { Product } from 'src/internal/domain/product/entities/product.entity';

let model: typeof ProductModel;
let categoryModel: typeof CategoryModel;
let repository: IProductRepository;

describe('Product Sequelize Repository', () => {
  beforeAll(async () => {
    await initDatabase();
    model = ProductModel;
    categoryModel = CategoryModel
    repository = new ProductSequelizeRepository(model, categoryModel);
  });
  afterAll(async () => closeDatabase());

  describe('createCategories', () => {
    it('should create categories', async () => {
      // act
      await repository.createCategories([{
        id: 'categorieId',
        name: 'Test-createCategories',
        description: 'test',
      }]);
      const categories = await repository.getCategories();
      // assert
      expect(categories).not.toBeNull();
      expect(categories.length).toBeGreaterThan(0);
    });
  });

  describe('getCategories', () => {
    it('should get categories', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-getCategories';
      const categoryId = 'abcd-efgh-ijkl-mno-getCategories';

      await categoryModel.create({
        id: categoryId,
        name: 'category-name-test-getCategories',        
        description: 'description-name-test',        
      });
      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });
      // act
      const categories = await repository.getCategories();
      // assert
      expect(categories).not.toBeNull();
    });
  });

  describe('updateQuantity', () => {
    it('should update product quantity by id', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-updateQuantity';
      const categoryId = 'abcd-efgh-ijkl-mno-updateQuantity';

      const quantity = 1;
      await categoryModel.create({
        id: categoryId,
        name: 'category-name-test-updateQuantity',        
        description: 'description-name-test',        
      });
      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId,
        description: 'description-name-test',
        price: 140,
        quantity,
      });
      // act
      const newQuantity = await repository.updateQuantity(productId, 2);
      const productModel = await model.findOne({ where: { id: productId } });
      // assert
      expect(newQuantity).toBe(2);
      expect(newQuantity).not.toBe(quantity);
      expect(productModel.quantity).toBe(newQuantity);
    });
  });

  describe('findByCategory', () => {
    it('should get product by category', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-findByCategory';
      const categoryId = 'abcd-efgh-ijkl-mno-findByCategory';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-findByCategory',        
        description: 'description-name-test',        
      });
      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });
      // act
      const products = await repository.findByCategory(categoryId);
      // assert
      expect(products).not.toBeNull();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should get product by id', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-findOne';
      const categoryId = 'abcd-efgh-ijkl-mno-findOne';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-findOne',        
        description: 'description-name-test',        
      });
      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });
      // act
      const product = await repository.findOne(productId);
      // assert
      expect(product).not.toBeNull();
    });
  });

  describe('findAll', () => {
    it('should get all products', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-findAll';
      const categoryId = 'abcd-efgh-ijkl-mno-findAll';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-findAll',        
        description: 'description-name-test',        
      });
      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });
      // act
      const products = await repository.findAll();
      // assert
      expect(products).not.toBeNull();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-create';
      const categoryId = 'abcd-efgh-ijkl-mno-create';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-create',        
        description: 'description-name-test',        
      });

      let productEntity: Product = new Product({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });

      // act
      await repository.create(productEntity);
      const product = await repository.findOne(productId);

      // assert
      expect(product).not.toBeUndefined();
      expect(product).not.toBeNull();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-update';
      const categoryId = 'abcd-efgh-ijkl-mno-update';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-update',        
        description: 'description-name-test',        
      });

      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });

      // act
      await repository.update(productId, {
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test-updated',
        price: 100,
      });
      const productEntityUpdated = await repository.findOne(productId);

      // assert
      expect(productEntityUpdated).not.toBeUndefined();
      expect(productEntityUpdated).not.toBeNull();
      expect(productEntityUpdated.description).toBe('description-name-test-updated');
    });
  });

  describe('delete', () => {
    it('should delete an customer', async () => {
      // arrange
      const productId = 'abcd-efgh-ijkl-delete';
      const categoryId = 'abcd-efgh-ijkl-mno-delete';

      await categoryModel.create({
        id: categoryId,
        name: 'test-category-delete',        
        description: 'description-name-test',        
      });

      await model.create({
        id: productId,
        name: 'product-name-test',
        categoryId: categoryId,
        description: 'description-name-test',
        price: 100,
        quantity: 1,
      });

      // act
      await repository.delete(productId);
      const customerEntity = await repository.findOne(productId);

      // assert
      expect(customerEntity).toBeNull();
    });
  });
});
