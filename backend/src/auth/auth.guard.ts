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
    const token = this.extractTokenFromHeader(request);
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

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = (request as any).headers.authorization;
    const [type, token] = authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
