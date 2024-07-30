import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { VerifyProductDto } from "src/internal/domain/product/dto/verify-product.dto";
import { IProductRepository } from "src/internal/domain/product/repositories/product.repository";
import { DomainException } from "src/internal/application/errors";

@Injectable()
export class DecreaseProductQuantity {
  constructor(
    @Inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  // verificar regra
  async execute(
    products: VerifyProductDto[],
  ): Promise<Array<{ id: string; quantity: number; value: number }>> {
    const productVerified = [];
    for (const p of products) {
      const product = await this.productRepository.findOne(p.id);
      if (!product) throw new NotFoundException("Product not found.");

      const quantity = product.quantity - p.quantity;
      if (quantity < 0)
        throw new DomainException("Product quantity is not enough.");

      productVerified.push({ id: product.id, quantity, value: product.price });
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
