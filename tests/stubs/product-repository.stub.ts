import { Category } from "src/internal/domain/product/entities/category.entity";
import { Product } from "src/internal/domain/product/entities/product.entity";
import {
  IProductRepository,
  categoriesToCreate,
} from "src/internal/domain/product/repositories/product.repository";

export const makeProductRepository = (): IProductRepository => {
  class ProductRepositoryStub implements IProductRepository {
    async findByCategory(categoryId: string): Promise<Product[] | null> {
      return Promise.resolve([
        {
          id: "id",
          name: "name",
          description: "description",
          categoryId: categoryId,
          price: 1,
          quantity: 1,
        } as Product,
      ]);
    }
    async updateQuantity(id: string, quantity: number): Promise<number> {
      return `${id}+${quantity}`.length;
    }
    createCategories(categories: categoriesToCreate): Promise<void> {
      throw new Error("Method not implemented.");
    }
    findOrCreateCategories(categories: categoriesToCreate): Promise<void> {
      throw new Error("Method not implemented.");
    }
    async getCategories(): Promise<Category[]> {
      return Promise.resolve([
        {
          id: "id",
          name: "Bebida",
          description: "description",
        } as Category,
      ]);
    }
    async findOne(id: string): Promise<Product> {
      return Promise.resolve({
        id,
        name: "string;",
        description: "string;",
        categoryId: "string;",
        price: 1,
        quantity: 1,
      } as Product);
    }
    findAll(): Promise<Product[]> {
      throw new Error("Method not implemented.");
    }
    async create(_params: Partial<Product>): Promise<void | Product> {
      // void
    }
    async delete(_id: string): Promise<void> {
      // void
    }
    async update(id: string, params: Partial<Product>): Promise<void> {
      // void
    }
  }

  return new ProductRepositoryStub();
};
