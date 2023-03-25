import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetUser } from '../auth/common/decorators';
import { StartupService } from './startup.service';

@Controller('startup')
export class StartupController {
  constructor(private _startupServices: StartupService ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/addCampaign')
  register(@Body() campaign: any, @GetUser('sub') userId: string) {
    return this._startupServices.addCampaign(campaign,userId);
  }

}
