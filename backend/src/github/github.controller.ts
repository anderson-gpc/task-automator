import { Controller, Get, UseInterceptors, Req, UseGuards } from "@nestjs/common";
import { ConnectOctokit } from "../utils/connect-octokit";
import { IActionGet } from "../shared/interfaces/actions.interface";
import { JWTGuard } from "../auth/auth.guard";

@Controller("/github/issues")
export class GithubControllerGetIssues implements IActionGet {

  @UseGuards(JWTGuard)
  @UseInterceptors(ConnectOctokit)
  @Get()
  async get(@Req() req: any) {
    const { data } = await req.octokit.request("GET /user/issues");
    return data;
  }
}

@Controller("/github/network") // Implements Acess Refine Token 
export class GithubControllerGetNetwork implements IActionGet {
    private query: string = '';

    @UseGuards(JWTGuard)
    @UseInterceptors(ConnectOctokit)
    @Get()
    public async get(@Req() req: any ) {
        this.query = req.originalUrl.split('?')[1];
        const { data } = await req.octokit.request(`GET /user/${this.query}`)
        return data;
    }
}
