import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { GithubStrategy } from "./github.strategy";
import { AuthService } from "./auth.service";

@Module({
    imports: [ConfigModule.forRoot(), UserModule],
    controllers: [AuthController],
    providers: [GithubStrategy, AuthService],
})

export class AuthModule {};
