import { Controller, Get, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { CurrentUser } from './currentUser.decorator';
import { UserDocument } from '../models/user.schema';

@Controller('users')
export class UsersController {

@Get('me')
@UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: Partial<UserDocument>) {
    
    return user;
  }
}
