import { ForbiddenException, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto';
import { UserDto } from '../user/dto/user.dto';
import { UserEntity } from '../user/entity/user.entity';
import { UserType } from 'src/common/types/user';
import { UserService } from '../user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
    private readonly _userService: UserService,
    private readonly config: ConfigService,
    private jwtService: JwtService) { }

  generateUserId() {
    return `UID${new Date().toISOString()}${Math.floor(Math.random() * 99)}`
  }
  async register(dto: UserDto): Promise<Tokens> {
    try {
      const hash = await argon2.hash(dto.password);
      const user = new UserEntity()
      user.userId = this.generateUserId();
      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      user.mobile = dto.mobile;
      user.userType = dto.userType;
      user.email = dto.email;
      user.password = hash;

      const res = await this._userRepository.save(user);
      const token = await this.getToken(res.id, res.email, res.firstName, res.userType);

      await this.updateRt(res.id, token.refreshToken);
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async login(credentials: LoginDto): Promise<Tokens | Error> {
    try {
      const tenant = await this._userRepository.findOne({
        where: { email: credentials.email },
        select: ['password', 'id', 'email', 'firstName', "userType"]
      })

      if (!tenant) { throw new ForbiddenException('Invalid credentials') }
      const isValid = await argon2.verify(tenant.password, credentials.password);

      if (!isValid) { throw new ForbiddenException('Invalid credentials') }

      const token = await this.getToken(tenant.id, tenant.email, tenant.firstName, tenant.userType);
      await this.updateRt(tenant.id, token.refreshToken);
      return token;
    } catch (error) {
      return error;
    }
  }

  async logout(userId: number) {
    console.log(userId);
    
    try {
      const user = await this._userRepository.findOne({
        where: {
          id: userId,
          hashRt: Not(IsNull())
        }
      });

      if (!user) {
        throw new ForbiddenException('Invalid Action');
      }
      user.hashRt = null;
      await this._userRepository.save(user);
      return { status: true }
    } catch (error) {
      return error
    }
  }
  async refresh(userId: number, refreshToken: string) {

    const tenant = await this._userRepository.findOne({
      where: {
        id: userId,
        hashRt: Not(IsNull()),
      },
      select: ['id', 'hashRt', "email", "firstName", "userType"]
    })
    console.log(tenant);

    if (!tenant) throw new ForbiddenException('Invalid Action');

    const isValid = await argon2.verify(tenant.hashRt, refreshToken);

    if (!isValid) throw new ForbiddenException('Invalid Action');

    const token = await this.getToken(tenant.id, tenant.email, tenant.firstName, tenant.userType);
    await this.updateRt(tenant.id, token.refreshToken);
    return token;
  }

  private async getToken(userId: number, email: string, name: string, userType: UserType) {
    const [at, rt]: string[] = await Promise.all([
      this.jwtService.sign({
        sub: userId,
        email: email,
        name: name,
        userType: userType
      }, { secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: '1h' }),
      this.jwtService.sign({
        sub: userId,
        email: email,
      }, { secret: this.config.get("JWT_REFRESH_SECRET"), expiresIn: '8h' })
    ])

    return {
      accessToken: at,
      refreshToken: rt
    }
  }

  private async updateRt(id: number, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);

    const user = await this._userRepository.findOne({
      where: { id: id },
    })
    user.hashRt = hash;

    await this._userRepository.save(user);
  }

}
