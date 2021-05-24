import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JobsService} from 'service/jobs-service';
import {AppController} from './app.controller';
import {CacheService, GraphqlService, TypeOrmService} from './config';
import {DateScalar} from './config/graphql/scalars/date.scalar';
import {UploadScalar} from './config/graphql/scalars/upload.scalar';

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
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    DateScalar,
    JobsService,
    UploadScalar,
    ...Object.values(Resolvers),
  ]
})
export class AppModule {
}
