import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoUtil {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = this.configService.get<string>('ARGON2_SALT');
    if (!salt) {
      throw new Error('ARGON2_SALT is not configured');
    }
    const hash = await argon2.hash(password, {
      salt: Buffer.from(salt),
      type: argon2.argon2id,
      raw: true, // Get raw binary output
    });
    return (hash as Buffer).toString('hex'); // Convert to hex format
  }

  async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    // Convert hex back to buffer for verification
    const hashBuffer = Buffer.from(hashedPassword, 'hex');
    const salt = this.configService.get<string>('ARGON2_SALT');
    if (!salt) {
      throw new Error('ARGON2_SALT is not configured');
    }
    
    const plainHash = await argon2.hash(plainPassword, {
      salt: Buffer.from(salt),
      type: argon2.argon2id,
      raw: true,
    });
    
    return hashBuffer.equals(plainHash as Buffer);
  }

  async encrypt(data: string): Promise<string> {
    const salt = this.configService.get<string>('ARGON2_SALT');
    if (!salt) {
      throw new Error('ARGON2_SALT is not configured');
    }
    const hash = await argon2.hash(data, {
      salt: Buffer.from(salt),
      type: argon2.argon2id,
      raw: true, // Get raw binary output
    });
    return (hash as Buffer).toString('hex'); // Convert to hex format
  }

  async decrypt(hashedData: string, plainData: string): Promise<boolean> {
    // Convert hex back to buffer for verification
    const hashBuffer = Buffer.from(hashedData, 'hex');
    const salt = this.configService.get<string>('ARGON2_SALT');
    if (!salt) {
      throw new Error('ARGON2_SALT is not configured');
    }
    
    const plainHash = await argon2.hash(plainData, {
      salt: Buffer.from(salt),
      type: argon2.argon2id,
      raw: true,
    });
    
    return hashBuffer.equals(plainHash as Buffer);
  }
}
