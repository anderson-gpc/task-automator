import { Module } from "@nestjs/common";
import { GithubControllerGetIssues } from "../controller/github.controller";

@Module({
    controllers: [GithubControllerGetIssues],
})

export class GithubModule {};
