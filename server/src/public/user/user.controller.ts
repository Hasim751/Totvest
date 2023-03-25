import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
   getAll(): Promise<any> {
    return this.userService.getAll();
  }

  @Post('/create')
  create(@Body() user : UserEntity): Promise<any> {
    return this.userService.create(user);
  }
  @Post('/account/edit')
  editAccount(@Body() user : UserEntity): Promise<any> {
    return this.userService.create(user);
  }
}
