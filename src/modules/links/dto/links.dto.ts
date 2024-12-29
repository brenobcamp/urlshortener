import { IsString } from 'class-validator';

export class CreateLinkDTO {
  @IsString()
  originalLink: string;
}
