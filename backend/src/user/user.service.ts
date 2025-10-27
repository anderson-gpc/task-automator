import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";
import type { ICreate } from "../utils/interfaces/crud.interface";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService implements ICreate<User, UserDTO> {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>
  ) {}

  async create(data: User) {
    try {
      const existingUser = await this.verifyGithubUser(data.githubId!);

      let user: User;

      if (existingUser) {
        await this.userRepository.update(existingUser.id!, data);
        user = await this.userRepository.findOneOrFail({
          where: { id: existingUser.id! },
        });
      } else {
        user = this.userRepository.create(data);
        await this.userRepository.save(user);
      }

      const userDTO = new UserDTO(
        user.githubId!,
        user.displayName!,
        user.username!,
        user.acessToken!,
        user.photo!
      );

      return userDTO;
    } catch (error: any) {
      throw new Error("Erro ao criar ou atualizar o acesso do usuário");
    }
  }

  private async verifyGithubUser(githubId: string) {
    return await this.userRepository.findOne({
      where: { githubId: githubId },
    });
  }
}
