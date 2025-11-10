import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class GithubRepository {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 20 })
  githubId!: string;

  @ManyToOne(() => User, (user) => user.repositories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "githubId", referencedColumnName: "githubId" }) 
  user!: User;

  @Column({ length: 50 })
  githubRepoId!: string;

  @Column({ length: 255 })
  url!: string;
}
