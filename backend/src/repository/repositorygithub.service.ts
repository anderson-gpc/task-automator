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
        userId: Number(data.userId),
        url: data.url,
      });
      const repoDB = await this.githubRepository.save(repo);
      return { url: repoDB.url, userId: repoDB.user.toString() };
    } catch (error) {
      throw new BadRequestException("DTO inválido ou erro ao salvar");
    }
  }

  async update(data: RepositoryDTO, id: string): Promise<String> {
    try {
      const repo = await this.githubRepository.findOne({
        where: { id: Number(id) },
      });
      if (repo) {
        repo.url = data.url;
        const repoEntity = await this.githubRepository.save(repo);
        return repoEntity.url;
      } else {
        throw new BadRequestException("Não foi encontrado o repositório!");
      }
    } catch (error) {
      throw new BadRequestException(
        "Não foi possível atualizar a URL do repositório"
      );
    }
  }

  async getAll(userId: number): Promise<GithubRepository[]> {
    return await this.githubRepository.find({where: {userId: userId}});
  }
}
