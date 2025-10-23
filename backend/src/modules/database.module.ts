import { Module } from "@nestjs/common";
import { dataBaseProviders } from "../database/database.providers";

@Module({
    providers: [...dataBaseProviders],
    exports: [...dataBaseProviders]
})

export class DatabaseModule {};