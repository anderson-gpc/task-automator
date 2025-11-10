import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { GithubRepository } from "./repositorygithub.entity";

@Entity()
@Unique(["githubId"])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 20 })
  githubId!: string;

  @Column({ length: 255 })
  username!: string;

  @Column({ length: 255 })
  displayName!: string;

  @Column({ length: 255, nullable: true })
  acessToken?: string;

  @Column({length: 255, nullable: true})
  refinedAcessToken?: string;

  @Column({ length: 255, nullable: true })
  photo?: string;

  @OneToMany(() => GithubRepository, (repo) => repo.user)
  repositories?: GithubRepository[];
}
