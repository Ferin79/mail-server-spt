import { Project } from "./Project";
import { Role } from "./Role";
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
import { hash } from "bcryptjs";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 12);
  }
}
