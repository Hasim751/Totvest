import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StartupService } from './startup.service';

@Controller('startup')
export class startupController {
  constructor(private _startupServices: StartupService ) {}

  // @HttpCode(HttpStatus.OK)
  // @Get('/addCampaign')
  // register(@Body() user: UserDto) {
  //   return this._startupServices.addCampaign(user);
  // }

}
