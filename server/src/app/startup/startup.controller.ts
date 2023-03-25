import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetUser, Public } from '../auth/common/decorators';
import { StartupService } from './startup.service';

@Controller('startup')
export class StartupController {
  constructor(private _startupServices: StartupService ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/addCampaign')
  addCampaign(@Body() campaign: any, @GetUser('sub') userId: string) {
    return this._startupServices.addCampaign(campaign,userId);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('/getAllCampaigns')
  getAllCampaigns() {
    return this._startupServices.getAllCampaign()
  }

}
