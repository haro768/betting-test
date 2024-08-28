import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Event } from './Event.entity';
import {User} from "./User.entity";

@Entity('user_bets')
export class UserBet {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Event, event => event.userBets)
    @JoinColumn({ name: 'event_id' })
    event!: Event;

    @ManyToOne(() => User, user => user.userBets)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    betAmount!: number;
}