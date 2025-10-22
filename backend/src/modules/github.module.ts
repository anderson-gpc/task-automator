import { Module } from "@nestjs/common";
import { ConnectOctokit } from "../utils/Octokit";
import { GithubControllerGetIssues } from "../controller/github/GithubControllerIssues";
import { GithubControllerFollowers } from "../controller/github/GithubControllerNetwork";

@Module({
    controllers: [GithubControllerGetIssues, GithubControllerFollowers],
})

export class GithubModule {};
