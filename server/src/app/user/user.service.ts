import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  // constructor(@InjectRepository(User) private _userRepository: Repository<User>) { }

  private readonly _userRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,

  ) {
  }

  getAll(): Promise<UserEntity[]> {
    return this._userRepository.find({
    });
  }

  async getById(id: number): Promise<UserEntity> {
    try {
      const user = await this._userRepository.findOneOrFail({
        where: { id },
      });
      return user
    } catch (error) {
      console.log(error);
    }
  }

  create(userDto: UserEntity) {
    const user = new UserEntity();
    user.firstName = userDto.firstName;
    user.email = userDto.email;
    user.mobile = userDto.mobile;
    user.lastName = userDto.lastName;
    user.address = userDto.address;
    user.avatar = userDto.avatar;
    
    // const result = await this._userRepository.create(user);
    return this._userRepository.save(user);
  }

  editAccount(UserAccount: UserDto) {

  }
}

