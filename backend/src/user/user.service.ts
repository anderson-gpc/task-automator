import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";
import type { ICreate } from "../shared/interfaces/crud.interface";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService implements ICreate<User, UserDTO> {
  private acessTemp!: string;

  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>
  ) {}

  async create(data: User) {
    try {
      const existingUser = await this.getUser(data.githubId!);

      if (existingUser) {
  const { id, githubId, ...partial } = data;
  console.log("Atualizando usuário:", { criteria: { githubId }, partial });
  await this.userRepository.update({ githubId }, partial);
} else {
        const createUser = this.userRepository.create(data);
        await this.userRepository.save(createUser);
      }

      const user = await this.getUser(data.githubId);

      const userDTO = new UserDTO(
        user!.githubId!,
        user!.displayName!,
        user!.username!,
        user!.photo!
      );
      this.acessTemp = user!.githubId!;

      return userDTO;
    } catch (error: any) {
      throw new Error("Erro ao criar ou atualizar o acesso do usuário");
    }
  }

  private async getUser(githubId: string) {
    return await this.userRepository.findOne({
      where: { githubId: githubId },
    });
  }

  async getAcess() {
    return await this.getUser(this.acessTemp);
  }
}
