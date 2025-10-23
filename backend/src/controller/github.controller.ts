import { Controller, Get, UseInterceptors, Req } from "@nestjs/common";
import { ConnectOctokit } from "../utils/Octokit";
import { IActionGet } from "../interfaces/actions.interface";

@Controller("/github/issues")
export class GithubControllerGetIssues implements IActionGet {

  @UseInterceptors(ConnectOctokit)
  @Get()
  async get(@Req() req: any) {
    const { data } = await req.octokit.request("GET /user/issues");
    return data;
  }
}

@Controller("/github/network")
export class GitHubControllerGetNetwork implements IActionGet {
    private query: string = '';

    @UseInterceptors(ConnectOctokit)
    @Get()
    public async  get(@Req() req: any ) {
        this.query = req.originalUrl.split('?')[1];
        const { data } = await req.octokit.request(`GET /user/${this.query}`)
        return data;
    }
}