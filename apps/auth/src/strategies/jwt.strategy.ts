import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { JwtUtil, UserJWTI } from "@app/common";
import { ConfigService } from "@nestjs/config";
import { UserDocument } from "../models/user.schema";

 
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService:ConfigService,
        private readonly userService:UsersService,
    ) {
       super({
        jwtFromRequest:ExtractJwt.fromExtractors([
            (request:Request) => request?.cookies?.Authentication,
        ]),
        secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
       })
    }
    async validate(payload:UserJWTI): Promise<Partial<UserDocument>> {
        const user = await this.userService.findOneById({id:payload.sub});
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

} 