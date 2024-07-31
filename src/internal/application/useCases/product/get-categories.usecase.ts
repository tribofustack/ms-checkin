import { Inject, Injectable } from "@nestjs/common";
import {
  sanitizeOutput,
  verifyFilePaths,
  verifyUuid,
} from "src/external/infra/utils/validator";
import { categoryNamesDto } from "src/internal/domain/product/dto/category-name.dto";
import { Category } from "src/internal/domain/product/entities/category.entity";
import { IProductRepository } from "src/internal/domain/product/repositories/product.repository";

@Injectable()
export class GetProductCategories {
  constructor(
    @Inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<{ categories: Category[] }> {
    const categories = await this.productRepository.getCategories();
    const sanitizedCategories = categories.map((cat) => {
      verifyUuid(cat.id);
      verifyFilePaths(cat.id);
      verifyFilePaths(cat.name);
      verifyFilePaths(cat.description);
      return new Category({
        id: sanitizeOutput(cat.id),
        name: sanitizeOutput(cat.name) as categoryNamesDto,
        description: sanitizeOutput(cat.description),
      });
    });

    return { categories: sanitizedCategories };
  }
}
