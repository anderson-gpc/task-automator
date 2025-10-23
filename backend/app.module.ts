import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from "./src/github/github.module";
import { AuthModule } from "./src/auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot(), GithubModule, AuthModule],
})

export class AppModule {};