import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as expressSession from "express-session";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressSession({
    secret: "myscret",
    resave: false,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
