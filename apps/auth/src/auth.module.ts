import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { AuthRepository } from './auth.repository';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [UsersModule, DatabaseModule , DatabaseModule.forFeature( [{name: UserDocument.name, schema: UserSchema}] ) , LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
        },
      },
    },
  })],
  controllers: [AuthController],
  providers: [AuthService,AuthRepository],
})
export class AuthModule {}
