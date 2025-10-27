import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User } from "../database/entity/user.entity";
import { ICreate } from "../utils/interfaces/crud.interface";

@Injectable()
export class AuthService implements ICreate<User, User> {
    constructor(private userService: UserService){}

    async create(userData: User) {
        await this.userService.create(userData);
    }
}
