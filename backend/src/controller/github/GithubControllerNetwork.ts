import { Controller, UseInterceptors, Get, Req } from "@nestjs/common";
import { ConnectOctokit } from "../../utils/Octokit";
import { IActionGet } from "../../interfaces/IActions";

@Controller("/github/followers")
export class GithubControllerFollowers implements IActionGet {

    @UseInterceptors(ConnectOctokit)
    @Get()
    public async  get(@Req() req: any) {
        const { data } = await req.octokit.request("GET /user/followers")
        return data;
    }
}
