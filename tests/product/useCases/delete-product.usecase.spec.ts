import { DeleteProduct } from 'src/internal/application/useCases/product';
import { makeProductRepository } from 'tests/stubs/product-repository.stub';

const makeSut = () => {
    const productRepository = makeProductRepository()
    const deleteProduct = new DeleteProduct(productRepository)
    return {
        productRepository,
        deleteProduct
    }
}

describe('Delete Product Use Case', () => {
    it('should call productRepository.delete with correct params', async () => {
        const {deleteProduct, productRepository} = makeSut()
        const deleteSpy = jest.spyOn(productRepository, "delete")

        const productIdMock = "id-for-delete"
        await deleteProduct.execute(productIdMock)

        expect(deleteSpy).toBeCalled()
        expect(deleteSpy).toBeCalledWith(productIdMock)
    });
});
