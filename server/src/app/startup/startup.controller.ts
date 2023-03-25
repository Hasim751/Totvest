import { Body, Controller, Get, Post } from '@nestjs/common';
import { StartupService } from './startup.service';

@Controller('user')
export class startupController {
  constructor(private _startupServices: StartupService ) {}
}
