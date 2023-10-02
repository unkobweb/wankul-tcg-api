import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FixturesModule } from './fixtures/fixtures.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "root",
      database: "wankul",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }), 
    UserModule, AuthModule, FixturesModule, OfferModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
