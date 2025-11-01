import { Body, Controller, Delete, Put, Req, UseGuards } from "@nestjs/common";
import { JWTGuard } from "../auth/auth.guard";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(JWTGuard)
    @Put("/refinedAcessToken")
    async putRefinedAcessToken(@Req() req: Request, @Body() data: any) {
        const githubId = (req as any).user.githubid;
        const { token } = data;
        await this.service.addRefinedAcessToken(token, githubId)
    }
}