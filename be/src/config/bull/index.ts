import { Injectable } from '@nestjs/common';
import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  createBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: 'localhost',
        port: 6379
      }
    };
  }
}
