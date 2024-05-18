import { GetProductCategories } from 'src/internal/application/useCases/product';
import { makeProductRepository } from 'tests/stubs/product-repository.stub';

const makeSut = () => {
    const productRepository = makeProductRepository()
    const getProductCategories = new GetProductCategories(productRepository)
    return {
        productRepository,
        getProductCategories
    }
}

describe('Get Product Categories Use Case', () => {
    it('should call productRepository.getCategories with correct params', async () => {
        const { getProductCategories, productRepository } = makeSut()
        const getCategoriesSpy = jest.spyOn(productRepository, "getCategories")

        const categories = await  getProductCategories.execute()

        expect(getCategoriesSpy).toBeCalled()
        expect(categories).toHaveProperty('categories')
        expect(categories.categories).toBeTruthy()
    });
});
