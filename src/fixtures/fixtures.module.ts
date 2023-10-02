import { Module } from '@nestjs/common';
import { CardxturesService } from './cardxtures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { DevxturesService } from './devxtures.service';
import { Offer } from '../entities/offer.entity';
import { User } from '../entities/user.entity';

const seeders = {
  prod: [CardxturesService],
  dev: [DevxturesService],
}

@Module({
  imports: [TypeOrmModule.forFeature([Offer, User, Card])],
  providers: seeders[process.env.NODE_ENV || 'dev'],
})
export class FixturesModule {}
