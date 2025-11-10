import { Controller, Post , Body, Param, ValidationPipe, Put, Get, Delete, UseGuards, Req} from "@nestjs/common";
import { RepositoryService } from "./repositorygithub.service";
import { RepositoryDTO } from "./dto/repository.dto";
import { JWTGuard } from "../auth/auth.guard";

@Controller("repository")
export class RepositoryController {
    constructor(private readonly service: RepositoryService){}

    @UseGuards(JWTGuard)
    @Post("/create")
    async create(@Body(new ValidationPipe({whitelist: true})) repoDto: RepositoryDTO){
        return this.service.create(repoDto);
    }

    @UseGuards(JWTGuard)
    @Put("/update/:id")
    async update(@Param('id') id: string, @Body(new ValidationPipe({whitelist: true})) repoDto: RepositoryDTO) {
        return this.service.update(repoDto, id);
    }

    @UseGuards(JWTGuard)
    @Get("user")
    async getAll(@Req() req: Request) {
        return this.service.getAll((req as any).user.githubid);
    }

    @UseGuards(JWTGuard)
    @Delete("/delete/:id")
    async delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
