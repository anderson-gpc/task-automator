import {
  Controller,
  Get,
  UseInterceptors,
  Req,
  UseGuards,
  Delete,
  Query
} from "@nestjs/common";
import { ConnectOctokit } from "../utils/connect-octokit";
import { JWTGuard } from "../auth/auth.guard";
import { GithubService } from "./github.service";

@Controller("/github")
export class GithubController {
  private query: string = "";

  constructor(private readonly service: GithubService) {}

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

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Get("/friends")
  public async getFriends(@Req() req: any) {
    const following = await req.octokit.request(`GET /user/following`);
    const followers = await req.octokit.request(`GET /user/followers`);
    const friends = this.service.getFriends(followers.data, following.data);
    return friends;
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Get("/notFollowers")
  public async getNotFollowers(@Req() req: any) {
    const following = await req.octokit.request(`GET /user/following`);
    const followers = await req.octokit.request(`GET /user/followers`);
    const notFollowers = this.service.getNotFollowers(followers.data, following.data);
    return notFollowers
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Delete("/following")
  public async deleterFollowing(@Query("username") username: string, @Req() req: any) {
    return await req.octokit.request(`DELETE /user/following/${username}`);
  }
}
