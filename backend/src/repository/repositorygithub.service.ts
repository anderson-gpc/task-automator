import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { GithubRepository } from "../database/entity/repositorygithub.entity";
import { RepositoryDTO } from "./dto/repository.dto";

@Injectable()
export class RepositoryService {
  constructor(
    @Inject("GITHUB_REPOSITORY")
    private readonly githubRepository: Repository<GithubRepository>
  ) {}

  async create(data: RepositoryDTO): Promise<RepositoryDTO> {
    try {
      const repo = this.githubRepository.create({
        user: Number(data.idUser),
        url: data.url,
      });
      const repoDB = await this.githubRepository.save(repo);
      return { url: repoDB.url, idUser: repoDB.user.toString() };
    } catch (error) {
      throw new BadRequestException("DTO inválido ou erro ao salvar");
    }
  }
}
