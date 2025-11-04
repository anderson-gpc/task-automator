import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/entity/user.entity";
import type { ICreate } from "../shared/interfaces/crud.interface";
import { UserDTO } from "./dto/user.dto";
import { EncryptionService } from "../utils/encryption.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService implements ICreate<User, UserDTO> {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
    private readonly security: EncryptionService,
    private readonly configService: ConfigService
  ) {}

  async createUser(data: User) {
    try {
      const existingUser = await this.getUser(data.githubId!);

      if (existingUser) {
        const { id, githubId, ...partial } = data;
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

  async getAcessToken(githubId: string): Promise<string> {
    const acessToken = await this.getUser(githubId);
    return acessToken?.acessToken ?? "";
  }

  async getRefinedAcessToken(githubId: string): Promise<string> {
    const refinedAcessToken = await this.getUser(githubId);
    if (refinedAcessToken?.refinedAcessToken) {
      return await this.security.descrypt(
        refinedAcessToken.refinedAcessToken,
        this.configService.get<string>("ENCRIPT_KEY")!
      );
    }
    return refinedAcessToken?.refinedAcessToken ?? "";
  }

  async addRefinedAcessToken(token: string, githubId: string) {
    try {
      const tokenEncrypted = await this.security.encrypt(
        token,
        this.configService.get<string>("ENCRIPT_KEY")!
      );
      await this.userRepository.update(
        { githubId: githubId },
        { refinedAcessToken: tokenEncrypted }
      );
    } catch (error) {
      throw new Error("Erro ao salvar");
    }
  }

  async deleteRefinedAcessToken(githubId: string): Promise<boolean> {
    try {
      await this.userRepository.update({githubId}, {refinedAcessToken: ""})
      return true;
    } catch (error) {
      throw new Error("Erro ao deletar seu token");
    }
  }
}
