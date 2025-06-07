import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'S3_SERVICE',
      useFactory: (configService: ConfigService) => {
        const region = configService.get<string>('AWS_REGION');
        const accessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = configService.get<string>('AWS_SECRET_ACCESS_KEY');

        if (!region || !accessKeyId || !secretAccessKey) {
          throw new Error('Variáveis de ambiente AWS não estão configuradas corretamente');
        }

        return new S3Client({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['S3_SERVICE'],
})
export class AwsModule {}