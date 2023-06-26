import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ProductModule, ProductModule, ProductModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
