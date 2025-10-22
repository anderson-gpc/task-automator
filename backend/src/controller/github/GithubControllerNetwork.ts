import { Controller, UseInterceptors, Get, Req, Body } from "@nestjs/common";
import { ConnectOctokit } from "../../utils/Octokit";
import { IActionGet } from "../../interfaces/IActions";

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
