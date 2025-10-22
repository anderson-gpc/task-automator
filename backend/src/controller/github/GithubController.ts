import { Controller, Get, UseInterceptors, Req } from "@nestjs/common";
import { ConnectOctokit } from "../../utils/Octokit";

@Controller("/github")
export class GithubController {

  @UseInterceptors(ConnectOctokit)
  @Get()
  async getIssues(@Req() req: any) {
    const { data } = await req.octokit.request("GET /user/issues");
    return data;
  }
}
