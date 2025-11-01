import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { GithubStrategy } from "./github.strategy";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWTGuard } from "./auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN") || "60s",
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, AuthService, JWTGuard],
})
export class AuthModule {}
