import { Controller, Get, UseInterceptors, Req } from "@nestjs/common";
import { ConnectOctokit } from "../../utils/Octokit";
import { IActionGet } from "../../interfaces/IActions";

@Controller("/github/issues")
export class GithubControllerGetIssues implements IActionGet {

  @UseInterceptors(ConnectOctokit)
  @Get()
  async getIssues(@Req() req: any) {
    const { data } = await req.octokit.request("GET /user/issues");
    return data;
  }
}
