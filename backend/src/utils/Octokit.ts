import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class ConnectOctokit implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { Octokit } = await import("octokit");
    const configService = new ConfigService();
    const octokit = new Octokit({ auth: configService.get<string>("GITHUB_TOKEN")! });

    request.octokit = octokit;

    return next.handle();
  }
}
