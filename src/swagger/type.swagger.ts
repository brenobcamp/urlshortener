import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UrlEntity } from 'src/entity/url';

export class UrlSwagger extends UrlEntity {}

export class AllUrlsListSwagger {
  @ApiProperty({ type: [UrlEntity] })
  urls: UrlEntity[];
}

export class MyUrlListSwagger extends OmitType(UrlEntity, [
  'id',
  'authorId',
  'excludedAt',
]) {}

export class OriginalUrlSwagger {
  @ApiProperty()
  originalLink: string;
}

export class ApiResponseSwagger {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}

export class ApiErrorResponseSwagger {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class BearerTokenResponseSwagger {
  @ApiProperty()
  access_token: string;
}
