import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';
import { NotFoundException } from 'src/internal/application/errors';

@Injectable()
export class FindProductsByCategory {
    constructor(
        @Inject('ProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(categoryId: string): Promise<{ products: Product[] }> {
        const products = await this.productRepository.findByCategory(categoryId);
        if(!products) {
            throw new NotFoundException('Category without products');
        }
        
        return { products }
    }
}
