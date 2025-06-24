import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { JwtModule } from '@nestjs/jwt';
import { CryptoUtil } from './crypto.util';
import { JwtUtil } from './jwt.util';

@Module({
  imports: [ConfigModule, JwtModule],
  providers: [CryptoUtil, JwtUtil],
  exports: [CryptoUtil, JwtUtil],
})
export class UtilsModule {}
