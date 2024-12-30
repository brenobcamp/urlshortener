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
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlDTO } from './dto/urls.dto';
import { AuthGuard } from '../auth/auth.guard';
import { OptionalAuthGuard } from '../auth/auth.optional.guard';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Get('/:code')
  @Redirect()
  async redirectToOriginalUrl(@Param('code') code: string) {
    try {
      const url = await this.urlsService.getOriginalUrl(code);
      return { url };
    } catch {
      throw new Error('Error redirecting to original URL');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/details/:code')
  async getUrlDetails(@Param('code') code: string, @Request() request) {
    try {
      return await this.urlsService.getOriginalUrlDetails(
        code,
        request.user.sub,
      );
    } catch {
      throw new Error('Error fetching URL details');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/allurls')
  async getAllUrls() {
    try {
      return await this.urlsService.getAllUrls();
    } catch {
      throw new Error('Error fetching all URLs');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/urls/myurls')
  async getAllMyUrls(@Request() request) {
    try {
      return await this.urlsService.getMyUrls(request.user.sub);
    } catch {
      throw new Error('Error fetching user URLs');
    }
  }

  @UseGuards(OptionalAuthGuard)
  @Post('/urls/create')
  async createShortUrl(@Body() body: UrlDTO, @Request() request) {
    try {
      return await this.urlsService.createShortUrl(body.url, request);
    } catch {
      throw new Error('Error creating short URL');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/urls/delete/:code')
  async deleteShortenedUrl(@Param('code') code: string, @Request() request) {
    try {
      return await this.urlsService.deleteUrl(code, request.user.sub);
    } catch {
      throw new Error('Error deleting short URL');
    }
  }

  @UseGuards(AuthGuard)
  @Put('/urls/update/:code')
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
      throw new Error('Error updating short URL');
    }
  }
}
