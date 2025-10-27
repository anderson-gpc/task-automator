import { DataSource } from "typeorm";
import { GithubRepository } from "../database/entity/repositorygithub.entity";

export const repositoryProviders = [
    {
        provide: 'GITHUB_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(GithubRepository),
        inject: ['DATA_SOURCE']
    }
]
