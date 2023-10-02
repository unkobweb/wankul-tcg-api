import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  cardId: number;

  @Column()
  name: string;
}