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
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlDTO } from './dto/urls.dto';
import { AuthGuard } from '../auth/auth.guard';
import { OptionalAuthGuard } from '../auth/auth.optional.guard';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @Get('/:code')
  async getOriginalUrl(@Param('code') code: string) {
    return await this.urlsService.getOriginalUrl(code);
  }

  @Get('/urls/allurls')
  async getAllUrls() {
    return await this.urlsService.getAllUrls();
  }

  @UseGuards(AuthGuard)
  @Get('/urls/myurls')
  async getAllMyUrls(@Request() request) {
    return await this.urlsService.getAllMyUrls(request.user.sub);
  }

  @UseGuards(OptionalAuthGuard)
  @Post('/urls/create')
  async createShortUrl(@Body() body: UrlDTO, @Request() request) {
    return await this.urlsService.createShortUrl(body.url, request);
  }
  @UseGuards(AuthGuard)
  @Delete('/urls/delete/:code')
  async deleteShortenedUrl(@Param('code') code: string) {
    return await this.urlsService.deleteUrl(code);
  }
  @UseGuards(AuthGuard)
  @Put('/urls/update/:code')
  async updateUrlShortened(
    @Body() body: any,
    @Param('code') code: string,
    @Request() request,
  ) {
    return await this.urlsService.updateUrlShortened(body, code, request);
  }
}
