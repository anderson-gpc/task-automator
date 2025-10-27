import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    @Get("github")
    @UseGuards(AuthGuard("github"))
    githubLogin() {
        return;
    }

    @Get("github/callback")
    @UseGuards(AuthGuard("github"))
    githubCallback(@Req() req: any) {
        const {acessToken, ...safeRes} = req.user
        return safeRes;
    }
}
