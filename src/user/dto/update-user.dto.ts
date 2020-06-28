import {IsEmail} from "class-validator";

export class UpdateUserDto {
  readonly userName: string
  @IsEmail()
  readonly email: string
  readonly bio: string
  readonly image: string
}