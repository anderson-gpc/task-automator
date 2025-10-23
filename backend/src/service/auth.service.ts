import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async createUser(userData: Partial<User>) {
        await this.userService.createGithubUser(userData);
    }
}
