import { Module } from "@nestjs/common";
import { ConnectOctokit } from "../utils/Octokit";
import { GithubControllerGetIssues } from "../controller/github/GithubControllerIssues";
import { GitHubControllerGetNetwork } from "../controller/github/GithubControllerNetwork";

@Module({
    controllers: [GithubControllerGetIssues, GitHubControllerGetNetwork],
})

export class GithubModule {};
