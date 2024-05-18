import { NotFoundException } from 'src/internal/application/errors';
import { FindProductsByCategory } from 'src/internal/application/useCases/product';
import { Product } from 'src/internal/domain/product/entities/product.entity';
import { makeProductRepository } from 'tests/stubs/product-repository.stub';

const makeSut = () => {
    const productRepository = makeProductRepository()
    const findProductsByCategory = new FindProductsByCategory(productRepository)
    return {
        productRepository,
        findProductsByCategory
    }
}

describe('Find Products By Category Use Case', () => {
    it('should call productRepository.findByCategory with correct params', async () => {
        const {findProductsByCategory, productRepository} = makeSut()
        const findByCategorySpy = jest.spyOn(productRepository, "findByCategory")

        const categoryIdMock = "id-for-findByCategory"
        await findProductsByCategory.execute(categoryIdMock)

        expect(findByCategorySpy).toBeCalled()
        expect(findByCategorySpy).toBeCalledWith(categoryIdMock)
    });
    it('should throw NotFoundException when products not exists', async () => {
        const { findProductsByCategory, productRepository } = makeSut()
        jest.spyOn(productRepository, "findByCategory").mockReturnValueOnce(null)

        try {
            await findProductsByCategory.execute("categoryIdMock")
        } catch(err) {
            expect(err).toBeTruthy()
            expect(err.message).toEqual('Category without products')
        }       
    });
    it('should call productRepository.findByCategory with correct params', async () => {
        const { findProductsByCategory } = makeSut()

        const products = await findProductsByCategory.execute("id-for-findByCategory")

        expect(products).toBeTruthy()
        expect(products.products.length).toBe(1)
    });
});
