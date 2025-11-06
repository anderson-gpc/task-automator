import { Controller, Get, UseGuards, Req, Res, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  @Get("github")
  @UseGuards(AuthGuard("github"))
  githubLogin() {
    return;
  }

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  githubCallback(@Req() req: any, @Res() res: any) {
    const token = req.user;

    res.cookie("acess_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 15,
    });

    return res.status(200).json({ message: "Autentificado!" });
  }

  @Post("logout")
  logout(@Res() res: any) {
    res.clearCookie("access_token");
    return res.json({ message: "Logout realizado." });
  }
}
