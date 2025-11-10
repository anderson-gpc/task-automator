import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable()
export class ConnectOctokit implements NestInterceptor {

  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    let acessToken: string = "";
    const { type } = request.headers;

    if (type === "refine") {
      acessToken = await this.userService.getRefinedAcessToken(request.user.refinedAcessToken);
    } else {
      acessToken = await this.userService.getAcessToken(request.user.githubId);
    }

    const { Octokit } = await import("octokit");
    const octokit = new Octokit({ auth: acessToken });

    request.octokit = octokit;

    return next.handle();
  }
}
