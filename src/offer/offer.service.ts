import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
  ) {}

  findAll() {
    return this.offerRepository.find({
      relations: ['user', 'card'],
    });
  }
}
