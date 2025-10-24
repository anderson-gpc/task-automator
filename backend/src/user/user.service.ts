import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";
import type { ICrud } from "../utils/interfaces/crud.interface";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService implements ICrud<User> {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) {}

    async create(data: Partial<User>) {
        try {
            const existingUser = await this.verifyGithubUser(data.githubId!);

            if (existingUser)
                await this.userRepository.update(existingUser.id!, data);
            else {
                const userEntity = this.userRepository.create({...data});
                this.userRepository.save(userEntity);
            }

            const userDTO: UserDto = {
                gitubId: existingUser!.githubId!,
                username: existingUser!.username!,
                photo: existingUser!.photo!,
                displayName: existingUser!.displayName!,
                acessToken: existingUser!.acessToken!
            }

            return userDTO;
        } catch (error: any) {
            throw new Error("Erro ao criar ou atualizar o acesso do usuário");
        }

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
