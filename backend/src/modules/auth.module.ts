import { Module } from "@nestjs/common";
import { AuthController } from "../controller/auth.controller";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user.module";
import { GithubStrategy } from "../auth/github.strategy";
import { AuthService } from "../service/auth.service";

@Module({
    imports: [ConfigModule.forRoot(), UserModule],
    controllers: [AuthController],
    providers: [GithubStrategy, AuthService],
})

export class AuthModule {};
