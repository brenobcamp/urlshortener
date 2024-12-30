import { IsString } from 'class-validator';

export class UrlDTO {
  @IsString()
  url: string;
}
