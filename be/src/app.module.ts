import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as Services from 'service/';
import * as Controllers from 'controllers/';
import * as Repositories from 'repository/';
import {CacheService, GraphqlService, TypeOrmService} from './config';
import {DateScalar} from './config/graphql/scalars/date.scalar';
import {UploadScalar} from './config/graphql/scalars/upload.scalar';

import {
  REFRESH_TOKEN_SECRET
} from '@environments';

import * as Resolvers from './resolvers';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    PassportModule,
    JwtModule.register({
      secret: REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule
  ],
  controllers: [...Object.values(Controllers)],
  providers: [
    DateScalar,
    ...Object.values(Services),
    ...Object.values(Repositories),
    UploadScalar,
    ...Object.values(Resolvers),
  ]
})
export class AppModule {
}
