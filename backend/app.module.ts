import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from "./src/github/github.module";
import { AuthModule } from "./src/auth/auth.module";
import { RepositoryModule } from "./src/repository/repositorygithub.module";
import { UserModule } from "./src/user/user.module";

@Module({
    imports: [ConfigModule.forRoot(), GithubModule, AuthModule, RepositoryModule, UserModule],
})

export class AppModule {};