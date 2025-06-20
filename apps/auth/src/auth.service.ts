import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/user.validation';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  signup(user: CreateUserDto) {
    return this.authRepository.create({
      ...user,
      createdAt: new Date(),
    });
  }
}
