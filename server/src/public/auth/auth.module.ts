import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtJwt, RtJwt } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AtJwt, RtJwt, UserService]

})
export class AuthModule { }
