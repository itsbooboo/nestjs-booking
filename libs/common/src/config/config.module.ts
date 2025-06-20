import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestjsConfigModule } from '@nestjs/config';
import envValidation from './env.validation';

@Module({
    imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config: Record<string, unknown>) => {
        return envValidation.parse(config);
      },
     // cache: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
