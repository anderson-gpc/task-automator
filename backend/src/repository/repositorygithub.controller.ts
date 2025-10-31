import { Controller, Post , Body, Param, ValidationPipe, Put, Get} from "@nestjs/common";
import { RepositoryService } from "./repositorygithub.service";
import { RepositoryDTO } from "./dto/repository.dto";

@Controller("repository")
export class RepositoryController {
    constructor(private readonly service: RepositoryService){}

    @Post("/create")
    async create(@Body(new ValidationPipe({whitelist: true})) repoDto: RepositoryDTO){
        return this.service.create(repoDto);
    }

    @Put("/update/:id")
    async update(@Param('id') id: string, @Body(new ValidationPipe({whitelist: true})) repoDto: RepositoryDTO) {
        return this.service.update(repoDto, id);
    }

    @Get("user/:userId")
    async getAll(@Param("userId") userId: number) {
        return this.service.getAll(userId);
    }
}
