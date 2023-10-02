import { Module } from '@nestjs/common';
import { CardxturesService } from './cardxtures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';

const seeders = {
  prod: [CardxturesService],
  dev: [CardxturesService],
}

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: seeders[process.env.NODE_ENV || 'dev'],
})
export class FixturesModule {}
