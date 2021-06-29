import { Mail } from "./Mail";
import { User } from "./User";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { nanoid } from "nanoid";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  apiKey: string;

  @Column({ nullable: true })
  sendGrid: string;

  @Column({ nullable: true })
  sendGridVerifiedEmail: string;

  @Column({ default: 0 })
  mailSent: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Mail, (mail) => mail.project)
  mails: Mail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateAPI() {
    this.apiKey = nanoid();
  }
}
