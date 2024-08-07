import { Module } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SequelizeModule } from "@nestjs/sequelize";
import { Uuid } from "src/external/infra/tokens/uuid/uuid";

import { ProductController } from "./product.controller";
import { ProductSequelizeRepository } from "./sequelize/product-sequelize.repository";
import { ProductModel } from "./sequelize/product.model";
import { CategoryModel } from "./sequelize/category.model";
import { CategorySeeder } from "./sequelize/seeders/category-seeder";
import {
  DecreaseProductQuantity,
  CreateProduct,
  DeleteProduct,
  FindProductsByCategory,
  GetProductCategories,
  UpdateProduct,
} from "src/internal/application/useCases/product";
import { RabbitMQ } from "src/external/infra/queue/rabbitmq";
import { CancelOrderConsumer } from "./rabbitmq/consumers/order-canceled.consumer";
import { IncreaseProductQuantity } from "src/internal/application/useCases/product/increase-product-quantity.usecase";
import { CheckinQueueSetup } from "src/external/infra/queue/setup";

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController],
  providers: [
    ProductSequelizeRepository,
    DecreaseProductQuantity,
    { provide: "ProductRepository", useExisting: ProductSequelizeRepository },
    { provide: "EventEmitter", useExisting: EventEmitter2 },
    Uuid,
    { provide: "IdGenerator", useExisting: Uuid },
    RabbitMQ,
    { provide: "MessageBroker", useExisting: RabbitMQ },
    CancelOrderConsumer,
    IncreaseProductQuantity,
    {
      provide: "IncreaseProductQuantity",
      useExisting: IncreaseProductQuantity,
    },
    CheckinQueueSetup,
    { provide: "CancelOrderConsumer", useExisting: CancelOrderConsumer },
    CategorySeeder,
    CreateProduct,
    DeleteProduct,
    FindProductsByCategory,
    GetProductCategories,
    UpdateProduct,
  ],
})
export class ProductModule {}
