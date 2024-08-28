import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import {UserBet} from "./UserBet.entity";

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    event_id!: number;

    @OneToMany(() => UserBet, userBet => userBet.event)
    @JoinColumn({ name: 'event_id' })
    userBets!: UserBet[];

    @Column({ type: 'varchar', length: 255 })
    event_name?: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    odds?: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}