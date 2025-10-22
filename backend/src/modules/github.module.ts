import { Module } from "@nestjs/common";
import { ConnectOctokit } from "../utils/Octokit";
import { GithubControllerGetIssues } from "../controller/github/GithubControllerIssues";

@Module({
    controllers: [GithubControllerGetIssues],
    providers: [ConnectOctokit]
})

export class GithubModule {};
