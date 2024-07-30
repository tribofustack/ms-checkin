import { IMessageBroker } from "src/internal/application/ports/queues/message-broker";
import {
  EXCHANGE,
  ORDER_QUEUE,
  PRODUCTS_QUEUE,
  ORDER_BINDING_KEY,
  PAYMENT_QUEUE,
} from "src/internal/application/configs/queue";
import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { CancelOrderConsumer } from "src/external/adapters/product/rabbitmq/consumers/order-canceled.consumer";

@Injectable()
export class CheckinQueueSetup implements OnApplicationBootstrap {
  constructor(
    @Inject("MessageBroker")
    private broker: IMessageBroker,
    @Inject("CancelOrderConsumer")
    private cancelOrderConsumer: CancelOrderConsumer,
  ) {}

  async onApplicationBootstrap() {
    try {
      console.time("Start message broker");
      setTimeout(async () => this.init(), 20000);
      console.timeEnd("Start message broker");
    } catch (error) {
      console.error(error.message);
    }
  }

  async init(): Promise<void> {
    await this.broker.connect();
    await this.broker.createExchange(EXCHANGE);
    await this.broker.createQueue(ORDER_QUEUE);
    await this.broker.createQueue(PAYMENT_QUEUE);
    await this.broker.createQueue(PRODUCTS_QUEUE);
    await this.broker.bindQueueInExchange({
      queue: PRODUCTS_QUEUE,
      exchange: EXCHANGE,
      bindigKey: ORDER_BINDING_KEY,
    });

    // quando consumir vai cancelar o pedido
    await this.broker.consume(PRODUCTS_QUEUE, (message) =>
      this.cancelOrderConsumer.handle(message),
    );
  }
}
