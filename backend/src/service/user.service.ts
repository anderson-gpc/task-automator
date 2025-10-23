import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) {}

    async createGithubUser(userData: Partial<User>) {
        const existingUser = await this.verifyGithubUser(userData.githubId!);
        if (existingUser) return;
        const user = this.userRepository.create({...userData})
        return this.userRepository.save(user);
    }

    private async verifyGithubUser(githubId: string) {
        return await this.userRepository.findOne({
            where: {githubId: githubId}
        })
    }
}
