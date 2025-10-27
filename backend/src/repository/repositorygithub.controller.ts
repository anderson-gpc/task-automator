import { Controller, Post , Body, Res, ValidationPipe} from "@nestjs/common";
import { RepositoryService } from "./repositorygithub.service";
import { RepositoryDTO } from "./dto/repository.dto";

@Controller("repository")
export class RepositoryController {
    constructor(private readonly service: RepositoryService){}

    @Post("/create")
    async create(@Body(new ValidationPipe({whitelist: true})) repoDto: RepositoryDTO){
        return this.service.create(repoDto);
    }
}
