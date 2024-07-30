import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IncreaseProductDto } from "src/internal/domain/product/dto/increase-product.dto";
import { IProductRepository } from "src/internal/domain/product/repositories/product.repository";

// payments.canceled
@Injectable()
export class IncreaseProductQuantity {
  constructor(
    @Inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  // verificar regra
  async execute(
    products: IncreaseProductDto[],
  ): Promise<Array<{ id: string; quantity: number; value: number }>> {
    const productVerified = [];
    for (const p of products) {
      const product = await this.productRepository.findOne(p.productId);
      if (!product) throw new NotFoundException("Product not found.");

      const quantity = product.quantity + p.quantity;

      productVerified.push({ id: product.id, quantity });
    }

    // transaction do banco de dados
    await Promise.all(
      productVerified.map(async (p) => {
        await this.productRepository.updateQuantity(p.id, p.quantity);
      }),
    );

    return productVerified;
  }
}
