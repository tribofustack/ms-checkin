import {  UpdateProduct } from 'src/internal/application/useCases/product';
import { makeProductRepository } from 'tests/stubs/product-repository.stub';

const makeSut = () => {
    const productRepository = makeProductRepository()
    const updateProduct = new UpdateProduct(productRepository)
    return {
        productRepository,
        updateProduct
    }
}

describe('Update Product Use Case', () => {
    it('should call productRepository.update with correct params', async () => {
        const { updateProduct, productRepository } = makeSut()
        const updateSpy = jest.spyOn(productRepository, "update")

        const idMock = "id-mock"
        const updateProductDtoMock = { name: "new-name", description: "new-description" }
        
        await updateProduct.execute(idMock, updateProductDtoMock)

        expect(updateSpy).toBeCalled()
        expect(updateSpy).toBeCalledWith(idMock, updateProductDtoMock)
    });
});
