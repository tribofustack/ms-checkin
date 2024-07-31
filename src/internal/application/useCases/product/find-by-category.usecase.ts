import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/internal/domain/product/entities/product.entity";
import { IProductRepository } from "src/internal/domain/product/repositories/product.repository";
import { NotFoundException } from "src/internal/application/errors";
import {
  sanitizeOutput,
  verifyFilePaths,
  verifyUuid,
} from "src/external/infra/utils/validator";

@Injectable()
export class FindProductsByCategory {
  constructor(
    @Inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  async execute(categoryId: string): Promise<{ products: Product[] }> {
    const products = await this.productRepository.findByCategory(categoryId);
    if (!products) {
      throw new NotFoundException("Category without products");
    }

    const sanitizedProducts = products.map((product) => {
      verifyUuid(product.categoryId);
      verifyUuid(product.id);

      verifyFilePaths(product.categoryId);
      verifyFilePaths(product.description);
      verifyFilePaths(product.id);
      verifyFilePaths(product.name);

      return new Product({
        categoryId: sanitizeOutput(product.categoryId),
        description: sanitizeOutput(product.description),
        id: sanitizeOutput(product.id),
        name: sanitizeOutput(product.name),
        price: product.price,
        quantity: product.quantity,
      });
    });

    return { products: sanitizedProducts };
  }
}
