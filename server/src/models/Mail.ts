import { Project } from "./Project";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class Mail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Exclude()
  @Column()
  html: string;

  @Column({ nullable: true, default: 0 })
  fileCount: number;

  @Column()
  projectId: number;

  @Column({ default: true })
  isSuccess: boolean;

  @ManyToOne(() => Project, (project) => project.mails, { onDelete: "CASCADE" })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
