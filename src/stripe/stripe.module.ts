import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'STRIPE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const stripeSecretKey = configService.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
          throw new Error('STRIPE_SECRET_KEY não está definida no arquivo .env');
        }
        return new Stripe(stripeSecretKey, {
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE_SERVICE'],
})
export class StripeModule {}