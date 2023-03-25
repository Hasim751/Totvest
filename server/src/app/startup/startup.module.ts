import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { startupController } from './startup.controller';
import { StartupService } from './startup.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [StartupService],
  controllers: [startupController]
})
export class StartupModule { }