import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";
import type { ICrud } from "../utils/interfaces/crud.interface";

@Injectable()
export class UserService implements ICrud<User> {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) {}

    async create(data: Partial<User>) {
        const existingUser = await this.verifyGithubUser(data.githubId!);
        if (existingUser) return;
        const user = this.userRepository.create({...data})
        return this.userRepository.save(user);
    }

    update(data: User | Partial<User>) {
        
    }

    delete(data: User | Partial<User>) {
        
    }

    view(data: User | Partial<User>) {
        
    }

    private async verifyGithubUser(githubId: string) {
        return await this.userRepository.findOne({
            where: {githubId: githubId}
        })
    }
}
