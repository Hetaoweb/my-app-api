import { IsEmail, Length } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  readonly email: string;

  @Length(8, 16)
  readonly password: string;
}