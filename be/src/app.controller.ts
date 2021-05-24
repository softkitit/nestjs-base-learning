import {STATIC} from '@environments';

import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {RefreshTokenResponse} from 'generator';

@Controller()
export class AppController {
  counter = 0;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager
  ) {
  }

  @Post('/api/refreshToken/:token')
  async refreshToken(@Param('token') token: string): Promise<RefreshTokenResponse> {
    return null;
  }

}
