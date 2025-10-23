import { Module } from "@nestjs/common";
import { GithubControllerGetIssues, GithubControllerGetNetwork } from "../controller/github.controller";

@Module({
    controllers: [GithubControllerGetIssues, GithubControllerGetNetwork],
})

export class GithubModule {};
