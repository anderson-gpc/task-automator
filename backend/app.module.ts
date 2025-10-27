import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from "./src/github/github.module";
import { AuthModule } from "./src/auth/auth.module";
import { RepositoryModule } from "./src/repository/repositorygithub.module";

@Module({
    imports: [ConfigModule.forRoot(), GithubModule, AuthModule, RepositoryModule],
})

export class AppModule {};