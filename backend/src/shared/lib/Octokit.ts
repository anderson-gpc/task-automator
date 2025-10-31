import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../../user/user.service";

@Injectable()
export class ConnectOctokit implements NestInterceptor {

  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const acessTemp = await this.userService.getAcess();
    const { Octokit } = await import("octokit");
    const octokit = new Octokit({ auth: acessTemp?.acessToken });

    request.octokit = octokit;

    return next.handle();
  }
}
