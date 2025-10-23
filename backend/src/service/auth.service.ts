import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";
import { ICreate } from "../interfaces/crud.interface";

@Injectable()
export class AuthService implements ICreate<User> {
    constructor(private userService: UserService){}

    async create(userData: Partial<User>) {
        await this.userService.create(userData);
    }
}
