import { ApiProperty } from '@nestjs/swagger';

export class UrlEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  originalUrl: string;
  @ApiProperty()
  shortenedUrl: string;
  @ApiProperty()
  excludedAt?: Date;
  @ApiProperty()
  accessCount: number;
  @ApiProperty()
  authorId?: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
