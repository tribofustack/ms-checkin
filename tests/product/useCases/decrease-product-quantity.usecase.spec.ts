import { DecreaseProductQuantity } from "src/internal/application/useCases/product";
import { makeProductRepository } from "tests/stubs/product-repository.stub";

const makeSut = () => {
  const productRepository = makeProductRepository();
  const decreaseProductQuantity = new DecreaseProductQuantity(
    productRepository,
  );
  return {
    productRepository,
    decreaseProductQuantity,
  };
};

describe("Verify Product Quantity Use Case", () => {
  it("should call productRepository.findOne with correct params", async () => {
    const { decreaseProductQuantity, productRepository } = makeSut();
    const findOneSpy = jest.spyOn(productRepository, "findOne");

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 1,
        price: 2,
      },
    ];

    await decreaseProductQuantity.execute(productsToVerifyMock);

    expect(findOneSpy).toBeCalled();
    expect(findOneSpy).toBeCalledWith(productsToVerifyMock[0].id);
  });
  it("should throw NotFoundException when product not exists", async () => {
    const { decreaseProductQuantity, productRepository } = makeSut();
    jest.spyOn(productRepository, "findOne").mockReturnValueOnce(null);

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 1,
        price: 2,
      },
    ];

    try {
      await decreaseProductQuantity.execute(productsToVerifyMock);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual("Product not found.");
    }
  });
  it("should throw DomainException when product quantity is less than zero", async () => {
    const { decreaseProductQuantity, productRepository } = makeSut();
    jest.spyOn(productRepository, "findOne");

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 3,
        price: 2,
      },
    ];

    try {
      await decreaseProductQuantity.execute(productsToVerifyMock);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual("Product quantity is not enough.");
    }
  });
});
