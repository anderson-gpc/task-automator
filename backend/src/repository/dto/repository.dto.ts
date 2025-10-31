import { IsString, IsNotEmpty } from 'class-validator';

export class RepositoryDTO {
  @IsNotEmpty()
  @IsString()
  url!: string;

  @IsNotEmpty()
  userId!: string;
}
