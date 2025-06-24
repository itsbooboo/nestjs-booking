import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.validation';
import { CryptoUtil, JwtUtil } from '@app/common';
import { UserDocument } from './models/user.schema';
import { Response } from 'express';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly cryptoUtil: CryptoUtil,
    private readonly jwtUtil: JwtUtil,
  ) {}
  async signup(user: CreateUserDto) {
    const hashedPassword = await this.cryptoUtil.hashPassword(user.password);
    return this.userService.create({
      ...user,
      password: hashedPassword,
      createdAt: new Date(),
    });
  }
  async login(user: UserDocument , response: Response) {
    const payload = { 
      email: user.email, 
      sub: user._id,
    };
    const accessToken = await this.jwtUtil.generateToken(payload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: true,
    });
  }
}
