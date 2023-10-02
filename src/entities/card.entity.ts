import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from "./offer.entity";

export enum CardState {
  FACTORY_NEW = 'NEUVE',
  MINIMAL_WEAR = 'PEU USÉE',
  FIELD_TESTED = 'USÉE',
  WELL_WORN = 'TRÈS USÉE',
  BATTLE_SCARRED = 'DÉTRUITE',
}
@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  cardId: number;

  @Column()
  name: string;

  @OneToMany(() => Offer, offer => offer.card)
  offers: Offer[];
}