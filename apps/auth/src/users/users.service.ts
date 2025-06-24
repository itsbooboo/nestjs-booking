import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { UserDocument } from '../models/user.schema';
import { CryptoUtil } from '@app/common';
import { FindUserDto } from '../dto/findUser.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly cryptoUtil: CryptoUtil,
    ){}
    async create(userData:Partial<UserDocument>){
      await this.checkIfUserExists(userData.email as string);
    return this.authRepository.create(userData as UserDocument);
    }
    async validateUser(email: string, password: string) {
        const user = await this.authRepository.findOne({ email });
        if (user && await this.cryptoUtil.verifyPassword(user.password, password)) {
          const { password: _, ...result } = user;
          return result;
        }
        return null;
      }
    async findByEmail(userDto: FindUserDto) {
        return await this.authRepository.findOne({ email:userDto.email });
      }
    private async checkIfUserExists(email: string) {
        const user = await this.authRepository.findOne({ email });
        if (user) {
          throw new UnprocessableEntityException('User already exists');
        }
        return;
      }
    async findOneById(userDto: FindUserDto) {
        let {password ,...user} = await this.authRepository.findOne({ _id: userDto.id });
        return user;
      }
}
