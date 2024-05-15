import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CustomerModule } from './external/adapters/customer/customer.module';
import { ProductModule } from './external/adapters/product/product.module';
import { HealthController } from './external/api/health/health.controller';
import DatabaseModule from './external/infra/database';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    DatabaseModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
