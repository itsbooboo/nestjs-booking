import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, UtilsModule } from '@app/common';
import { AuthRepository } from '../auth.repository';
import { UserDocument, UserSchema } from '../models/user.schema';

@Module({
  imports:[ 
    DatabaseModule ,
    DatabaseModule.forFeature( [{name: UserDocument.name, schema: UserSchema}] ),
    UtilsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,AuthRepository],
  exports: [UsersService,AuthRepository],
})
export class UsersModule {}
