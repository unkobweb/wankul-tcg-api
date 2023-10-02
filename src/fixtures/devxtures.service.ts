import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Offer } from "../entities/offer.entity";
import { Card, CardState } from "../entities/card.entity";
import * as argon2 from 'argon2';
import { faker } from '@faker-js/faker';
import cardsAsset from './assets/cards';

@Injectable()
export class DevxturesService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async generate() {
    let users = await this.userRepository.find();
    let cards = await this.cardRepository.find();
    let offers = await this.offerRepository.find();

    if (cards.length === 0) {
      cards = await this.cardRepository.save(cardsAsset.map((card, i) => ({
        name: card,
        cardId: i+1,
      })));
    }

    if (users.length === 0) {
      const usersToSave = [{
        email: 'test@test.fr',
        password: await argon2.hash('test'),
        city: 'Nantes'
      }]

      for (let i = 0; i < 20; i++) {
        usersToSave.push({
          email: faker.internet.email().toLowerCase(),
          password: await argon2.hash('test'),
          city: faker.location.city(),
        });
      }

      users = await this.userRepository.save(usersToSave);
    }

    if (offers.length === 0) {
      const offersToSave = [];

      for (let i = 0; i < 100; i++) {
        offersToSave.push({
          description: faker.lorem.paragraph(),
          state: faker.helpers.enumValue(CardState),
          card: faker.helpers.arrayElement(cards),
          user: faker.helpers.arrayElement(users),
        });
      }

      await this.offerRepository.save(offersToSave);
    }

  }

  async onModuleInit() {
    await this.generate();
    console.log('Devxtures generated');
  }
}