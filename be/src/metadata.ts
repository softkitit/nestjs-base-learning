import {CacheService, TypeOrmService} from '@config';
import {REFRESH_TOKEN_SECRET} from '@environments';
import {CacheModule, HttpModule} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtAuthGuard} from 'auth/guards/jwt-auth.guard';
import {JwtStrategy} from 'auth/strategy/jwt.strategy';
import * as Controllers from 'controllers';
import * as Repositories from 'repository';
import * as Services from 'service';

export default {
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    PassportModule,
    JwtModule.register({
      secret: REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    HttpModule
  ],
  controllers: [...Object.values(Controllers)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    ...Object.values(Services),
    ...Object.values(Repositories),
  ]
};
