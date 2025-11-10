import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { User } from "../database/entity/user.entity";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    const clientID = configService.get<string>("CLIENT_ID");
    const clientSecret = configService.get<string>("CLIENT_SECRET");
    const urlCallback = configService.get<string>("URL_CALLBACK");

    if (!clientID || !clientSecret || !urlCallback) {
      throw new Error(
        "As variáveis CLIENT_ID, CLIENT_SECRET e URL_CALLBACK devem ser definidas."
      );
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: urlCallback,
      scope: ["user:email"],
    });
  }

  async validate(
    acessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ): Promise<any> {
    const { id, username, displayName, photos } = profile;

    const userData = {
      githubId: id,
      username,
      displayName,
      photo: photos?.[0]?.value || "",
      acessToken,
    };
    const payload = await this.authService.createUser(userData as User);
    done(null, payload);
  }
}
