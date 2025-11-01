import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { GithubStrategy } from "./github.strategy";
import { AuthService } from "./auth.service";
import { JWTGuard } from "./auth.guard";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GithubStrategy, AuthService, JWTGuard],
})
export class AuthModule {}
