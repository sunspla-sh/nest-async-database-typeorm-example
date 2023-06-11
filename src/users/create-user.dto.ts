import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 32)
  firstName: string;

  @IsString()
  @Length(1, 32)
  lastName: string;
}
