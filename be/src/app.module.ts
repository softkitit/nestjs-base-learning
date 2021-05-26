import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtStrategy} from 'auth/strategy/jwt.strategy';
import * as Services from 'service/';
import * as Controllers from 'controllers/';
import * as Repositories from 'repository/';
import {CacheService, TypeOrmService} from './config';

import {
  REFRESH_TOKEN_SECRET
} from '@environments';

@Module({
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
    JwtStrategy,
    ...Object.values(Services),
    ...Object.values(Repositories),
  ]
})
export class AppModule {
}

