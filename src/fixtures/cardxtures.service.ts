import { Injectable, OnModuleInit } from "@nestjs/common";
import cards from './assets/cards';
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "../entities/card.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class CardxturesService implements OnModuleInit {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async generate() {
    const savedCards = await this.cardRepository.find();
    if (savedCards.length) {
      return;
    }

    await this.cardRepository.save(cards.map((card, i) => ({
      name: card,
      cardId: i+1,
    })));
  }

  async onModuleInit() {
    await this.generate();
    console.log('Cards generated');
  }
}