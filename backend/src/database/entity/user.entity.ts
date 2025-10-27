import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GithubRepository } from "./repositorygithub.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 20})
    githubId?: string

    @Column({length: 255})
    username!: string;

    @Column({length: 255})
    displayName!: string

    @Column({length: 255})
    acessToken?: string  

    @Column({length: 255})
    photo?: string;

    @OneToMany(() => GithubRepository, (repo) => repo.user)
    repositories?: GithubRepository[];
}
