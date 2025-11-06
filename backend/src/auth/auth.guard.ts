import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    console.log(token);
    if (!token) throw new UnauthorizedException("Acesso não autorizado");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET")!,
      });
      request["user"] = payload;
    } catch (error) {
      throw new UnauthorizedException("Acesso não autorizado");
    }
    return true;
  }

  private extractToken(request: any): string | undefined {
    const authorization = request.headers.authorization;
    if (authorization) {
      const [type, token] = authorization.split(" ");
      if (type === "Bearer") return token;
    }

    if (request.cookies?.access_token) {
      return request.cookies.access_token;
    }

    return undefined;
  }
}
