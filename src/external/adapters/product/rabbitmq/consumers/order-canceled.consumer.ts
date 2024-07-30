import { Inject, Injectable } from "@nestjs/common";
import { IncreaseProductQuantity } from "src/internal/application/useCases/product/increase-product-quantity.usecase";

@Injectable()
export class CancelOrderConsumer {
  constructor(
    @Inject("IncreaseProductQuantity")
    private readonly increaseProductQuantity: IncreaseProductQuantity,
  ) {}

  async handle(message: any) {
    try {
      console.log("executing increaseProductQuantity", message);
      await this.increaseProductQuantity.execute(message);
    } catch (error) {
      console.error("error on CanceOrderConsumer", error.message);
    }
  }
}
