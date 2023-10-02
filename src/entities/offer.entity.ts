import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Card, CardState } from "./card.entity";
import { User } from "./user.entity";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({type: "enum", enum: CardState})
  state: CardState;

  @Column({type: "text"})
  description: string;

  @ManyToOne(() => Card, card => card.offers)
  card: Card;

  @ManyToOne(() => User, user => user.offers)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
