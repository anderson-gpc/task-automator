import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User } from "../database/entity/user.entity";
import { ICreate } from "../shared/interfaces/crud.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements ICreate<User, User> {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async create(userData: User) {
    const user = await this.userService.create(userData);
    const payload = {
      userName: user.username,
      displayname: user.displayName,
      githubid: user.githubId,
      photo: user.photo,
    };
    const token = await this.jwtService.signAsync(payload);     
    return token;
  }
}
