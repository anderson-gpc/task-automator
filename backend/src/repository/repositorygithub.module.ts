import { Module } from "@nestjs/common";
import { RepositoryController } from "./repositorygithub.controller";
import { userProviders } from "../user/user.repository";
import { repositoryProviders } from "./repositorygithub.repository";
import { RepositoryService } from "./repositorygithub.service";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [RepositoryController],
    providers: [...userProviders, ...repositoryProviders, RepositoryService],
})

export class RepositoryModule {};
