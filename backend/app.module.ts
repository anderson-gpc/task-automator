import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from "./src/modules/github.module";
import { AuthModule } from "./src/modules/auth.module";

@Module({
    imports: [ConfigModule.forRoot(), GithubModule, AuthModule],
})

export class AppModule {};