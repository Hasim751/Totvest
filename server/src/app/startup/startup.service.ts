import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from './entity/campaign.entity';
@Injectable()
export class StartupService {
  constructor(
    @InjectRepository(CampaignEntity) private readonly _campaignRepository: Repository<CampaignEntity>,

  ) { }

  generateCampaignId() {
    return `UID${new Date().toISOString()}${Math.floor(Math.random() * 99)}`
  }
  async addCampaign(dto: any, userId: string): Promise<any> {
    try {
      const campaign = new CampaignEntity()
      campaign.campaignId = this.generateCampaignId();
      campaign.userId = userId;
      campaign.campaignName = dto.campaignName;
      campaign.tenure = dto.tenure;
      campaign.description = dto.description;
      campaign.minSubscription = dto.minSubscription;

      const res = await this._campaignRepository.save(campaign);
      return { message: "Campaign added successfully", data: res };
    } catch (error) {

      return { message: error.message, status: 400 }
    };
  }

  async getAllCampaign() {
    return await this._campaignRepository.find({
      select: [
        'campaignId',
        'campaignName',
        'description',
        'minSubscription',
        "userId"
      ],
    });
  }
}


