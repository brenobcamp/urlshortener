import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsNumber()
  @IsOptional()
  id: number;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
