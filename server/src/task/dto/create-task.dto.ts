import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  user?: User;
}
