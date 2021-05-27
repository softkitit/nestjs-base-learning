import {MyLogger} from '@config';

import {Logger} from '@nestjs/common';
import {NestFactory, Reflector} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import bootstrap from 'bootstrap';
import {AppModule} from './app.module';


process.on('uncaughtException', exception => {
  console.error('uncaughtException', exception.message); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});


(async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: {
        origin: true,
        preflightContinue: false,
      },
      logger: new MyLogger()
    });

    bootstrap(app).catch(e => {
      Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
      throw e;
    });

  } catch (e) {
    Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
    throw e;
  }
})()
