import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "./user.repository";
import { UserController } from "./user.controller";
import { EncryptionService } from "../utils/encryption.service";

@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders, EncryptionService],
    exports: [UserService]
})

export class UserModule {};