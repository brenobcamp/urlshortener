import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UrlDTO {
  @IsString()
  @ApiProperty()
  url: string;
}
