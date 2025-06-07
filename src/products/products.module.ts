import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { AwsModule } from 'src/aws/aws.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [AwsModule, StripeModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}