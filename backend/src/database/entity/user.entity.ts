import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
