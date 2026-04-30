import { Module } from '@nestjs/common';
import { CategoryCodeFirstResolver } from './resolvers/category.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.resolver';

// ✅ import your existing modules/services
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}