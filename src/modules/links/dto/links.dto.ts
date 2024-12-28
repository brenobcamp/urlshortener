import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDTO } from 'src/modules/auth/dto/auth.dto';

export class LinkDTO {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsString()
  originalLink: string;
  @IsString()
  shortenedLink: string;
  @IsObject()
  user?: UserDTO;
  @IsBoolean()
  active?: boolean;
  @IsNumber()
  accessCount: number;
}
