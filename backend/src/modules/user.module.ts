import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { userProviders } from "../repository/user.repository";
import { DatabaseModule } from "./database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [UserService]
})

export class UserModule {};