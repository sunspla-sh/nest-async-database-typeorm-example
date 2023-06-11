import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserArrayDto {
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  action: CreateUserDto[];
}
