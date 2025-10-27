import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class GithubRepository {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.repositories, {
    onDelete: "CASCADE",
  })
  user!: number;

  @Column()
  url!: string;
}
