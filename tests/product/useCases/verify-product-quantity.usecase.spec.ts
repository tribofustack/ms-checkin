import { DecreaseProductQuantity } from "src/internal/application/useCases/product";
import { makeEventEmitter } from "tests/stubs/event-emitter.stub";
import { makeProductRepository } from "tests/stubs/product-repository.stub";

const makeSut = () => {
  const productRepository = makeProductRepository();
  const eventEmitter = makeEventEmitter();
  const DecreaseProductQuantity = new DecreaseProductQuantity(
    productRepository,
    eventEmitter,
  );
  return {
    productRepository,
    eventEmitter,
    DecreaseProductQuantity,
  };
};

describe("Verify Product Quantity Use Case", () => {
  it("should call productRepository.findOne with correct params", async () => {
    const { DecreaseProductQuantity, productRepository, eventEmitter } =
      makeSut();
    const findOneSpy = jest.spyOn(productRepository, "findOne");
    const emitSpy = jest.spyOn(eventEmitter, "emit");

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 1,
        price: 2,
      },
    ];

    await DecreaseProductQuantity.execute(productsToVerifyMock);

    expect(findOneSpy).toBeCalled();
    expect(findOneSpy).toBeCalledWith(productsToVerifyMock[0].id);
    expect(emitSpy).toBeCalled();
  });
  it("should throw NotFoundException when product not exists", async () => {
    const { DecreaseProductQuantity, productRepository } = makeSut();
    jest.spyOn(productRepository, "findOne").mockReturnValueOnce(null);

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 1,
        price: 2,
      },
    ];

    try {
      await DecreaseProductQuantity.execute(productsToVerifyMock);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual("Product not found.");
    }
  });
  it("should throw DomainException when product quantity is less than zero", async () => {
    const { DecreaseProductQuantity, productRepository } = makeSut();
    jest.spyOn(productRepository, "findOne");

    const productsToVerifyMock = [
      {
        id: "id-product",
        quantity: 3,
        price: 2,
      },
    ];

    try {
      await DecreaseProductQuantity.execute(productsToVerifyMock);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual("Product quantity is not enough.");
    }
  });
});
