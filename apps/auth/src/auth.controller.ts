import { Body, Controller, Get, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@app/common';
import { CreateUserDto, createUserSchema } from './dto/user.validation';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { CurrentUser } from './users/currentUser.decorator';
import { UserDocument } from './models/user.schema';
import { Response } from 'express';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    return { success: true, user }; 
  }
}
