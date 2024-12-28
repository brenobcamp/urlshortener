import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinkDTO } from './dto/links.dto';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get('/:code')
  async getLink(@Param('code') code: string) {
    return await this.linksService.getFullLink(code);
  }
  @Post('/createurlshortened')
  async createLink(@Body() link?: LinkDTO) {
    const createdCard = await this.linksService.createLink(link);
    return createdCard;
  }
}
