import {
  Controller,
  Get,
  UseInterceptors,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ConnectOctokit } from "../utils/connect-octokit";
import { JWTGuard } from "../auth/auth.guard";

@Controller("/github")
export class GithubController {
  private query: string = "";

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Get("/issues")
  async getIssues(@Req() req: any) {
    const { data } = await req.octokit.request("GET /user/issues");
    return data;
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Get("/network")
  public async viewNetwork(@Req() req: any) {
    this.query = req.originalUrl.split("?")[1];
    const { data } = await req.octokit.request(`GET /user/${this.query}`);
    return data;
  }
}
