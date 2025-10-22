import { Module } from "@nestjs/common";
import { ConnectOctokit } from "../utils/Octokit";
import { GithubController } from "../controller/github/GithubController";

@Module({
    controllers: [GithubController],
    providers: [ConnectOctokit]
})

export class GithubModule {};
