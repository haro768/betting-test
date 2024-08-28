import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, JoinColumn,
} from "typeorm";
import {UserBet} from "./UserBet.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToMany(() => UserBet, userBet => userBet.user)
    @JoinColumn({ name: 'user_id' })
    userBets!: UserBet[];

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ default: "user" })
    role!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}