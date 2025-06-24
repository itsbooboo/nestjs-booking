import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserJWTI } from '../interfaces';

@Injectable()
export class JwtUtil {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload: UserJWTI): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<number>('JWT_EXPIRES');
    
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: `${expiresIn}s`,
    });
  }

  async verifyToken(token: string): Promise<UserJWTI> {
    const secret = this.configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}
