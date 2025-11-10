import { Module } from "@nestjs/common";
import { GithubModule } from "./src/github/github.module";
import { AuthModule } from "./src/auth/auth.module";
import { RepositoryModule } from "./src/repository/repositorygithub.module";
import { UserModule } from "./src/user/user.module";
import { ConfigGlobalModule } from "./src/config/config.module";

@Module({
    imports: [GithubModule, AuthModule, RepositoryModule, UserModule, ConfigGlobalModule],
})

export class AppModule {};