import { CreateProduct } from 'src/internal/application/useCases/product/create-product.usecase';
import { makeProductRepository } from 'tests/stubs/product-repository.stub';
import { makeIdGenerator } from 'tests/stubs/id-generator.stub';

const makeSut = () => {
  const productRepository = makeProductRepository()
  const idGenerator = makeIdGenerator()
  const createProduct = new CreateProduct(productRepository, idGenerator)
  return {
    productRepository,
    idGenerator,
    createProduct,
  }
}

describe('Create Product Use Case', () => {
  it('should call productRepository.create with correct params', async () => {
    const { createProduct, idGenerator, productRepository } = makeSut()
    const idGeneratedMock = 'id-testing'
    const generateSpy = jest.spyOn(idGenerator, "generate").mockReturnValueOnce(idGeneratedMock)
    const createSpy = jest.spyOn(productRepository, "create")

    const product = await createProduct.execute({
      name: 'name-test', 
      categoryId: 'categoryId-test', 
      description: 'description-test', 
      price: 5, 
      quantity: 3, 
    })

    expect(generateSpy).toBeCalled()
    expect(createSpy).toBeCalled()
    expect(createSpy).toBeCalledWith({
      id: idGeneratedMock,
      ...product,
    })
  });
  it('should return product', async () => {
    const { createProduct } = makeSut()

    const product = await createProduct.execute({
      name: 'name-test', 
      categoryId: 'categoryId-test', 
      description: 'description-test', 
      price: 5, 
      quantity: 3, 
    })

    expect(product).toBeTruthy()
    expect(product).toHaveProperty('id')
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('categoryId')
    expect(product).toHaveProperty('description')
    expect(product).toHaveProperty('price')
    expect(product).toHaveProperty('quantity')
  });
});
