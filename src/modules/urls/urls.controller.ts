import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Redirect,
  InternalServerErrorException,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlDTO } from './dto/urls.dto';
import { AuthGuard } from '../auth/auth.guard';
import { OptionalAuthGuard } from '../auth/auth.optional.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AllUrlsListSwagger,
  ApiErrorResponseSwagger,
  MyUrlListSwagger,
  OriginalUrlSwagger,
  UrlSwagger,
} from 'src/swagger/type.swagger';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Get('/:code')
  @Redirect()
  @ApiOperation({ summary: 'Redirects user to the original link' })
  @ApiResponse({
    status: 200,
    description: 'Redirect to original link',
    type: OriginalUrlSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Url Not Found',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error redirecting to original URL',
    type: ApiErrorResponseSwagger,
  })
  async redirectToOriginalUrl(@Param('code') code: string) {
    try {
      const url = await this.urlsService.getOriginalUrl(code);
      return { url };
    } catch {
      throw new InternalServerErrorException(
        'Error redirecting to original URL',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/allurls')
  @ApiOperation({ summary: 'Get all URLs in database' })
  @ApiResponse({
    status: 200,
    description: 'URLs created in database',
    type: AllUrlsListSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'It was not possible to find created Urls',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching all URLs',
    type: ApiErrorResponseSwagger,
  })
  async getAllUrls() {
    try {
      return await this.urlsService.getAllUrls();
    } catch {
      throw new InternalServerErrorException('Error fetching all URLs');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/myurls')
  @ApiOperation({ summary: 'Get all your shortened URLs' })
  @ApiResponse({
    status: 200,
    description: 'List of your created URLs',
    type: MyUrlListSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'It was not possible to find your Urls',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching user URLs',
    type: ApiErrorResponseSwagger,
  })
  async getAllMyUrls(@Request() request) {
    try {
      return await this.urlsService.getMyUrls(request.user.sub);
    } catch {
      throw new InternalServerErrorException('Error fetching user URLs');
    }
  }

  @UseGuards(OptionalAuthGuard)
  @Post('/urls/create')
  @ApiOperation({ summary: 'Create a shortened url' })
  @ApiResponse({
    status: 200,
    description: 'Shortened URL created',
    type: UrlSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Could not create short URL',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching user URLs',
    type: ApiErrorResponseSwagger,
  })
  async createShortUrl(@Body() body: UrlDTO, @Request() request) {
    try {
      return await this.urlsService.createShortUrl(body.url, request);
    } catch {
      throw new InternalServerErrorException('Error creating short URL');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/details/:code')
  @ApiOperation({ summary: 'Get details of a shortened URL' })
  @ApiResponse({
    status: 200,
    description: 'Details of shortened URL',
    type: UrlSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Url Not Found',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching URL details',
    type: ApiErrorResponseSwagger,
  })
  async getUrlDetails(@Param('code') code: string, @Request() request) {
    try {
      return await this.urlsService.getUrlDetails(code, request.user.sub);
    } catch {
      throw new InternalServerErrorException('Error fetching URL details');
    }
  }

  @UseGuards(AuthGuard)
  @Put('/urls/update/:code')
  @ApiOperation({ summary: 'Update original URL of a shortened URL' })
  @ApiResponse({
    status: 200,
    description: `Url updated.`,
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Url Not Found',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error updating short URL',
    type: ApiErrorResponseSwagger,
  })
  async updateUrlShortened(
    @Body() body: UrlDTO,
    @Param('code') urlCode: string,
    @Request() request,
  ) {
    try {
      return await this.urlsService.updateUrl(
        body.url,
        urlCode,
        request.user.sub,
      );
    } catch {
      throw new InternalServerErrorException('Error updating short URL');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/urls/delete/:code')
  @ApiOperation({ summary: 'Delete a shortened URL' })
  @ApiResponse({
    status: 200,
    description: `Url deleted`,
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Url not found or already excluded',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error deleting short URL',
    type: ApiErrorResponseSwagger,
  })
  async deleteShortenedUrl(@Param('code') code: string, @Request() request) {
    try {
      return await this.urlsService.deleteUrl(code, request.user.sub);
    } catch {
      throw new InternalServerErrorException('Error deleting short URL');
    }
  }
}
