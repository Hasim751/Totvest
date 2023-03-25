import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './entity/campaign.entity';
import { StartupController } from './startup.controller';
import { StartupService } from './startup.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  providers: [StartupService],
  controllers: [StartupController]
})
export class StartupModule { }