import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDTO } from './dto/links.dto';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
@Get('/allurls')
  async getAllUrls() {
    return await this.linksService.getAllUrls();
  }
  @Get('/:code')
  async getLink(@Param('code') code: string) {
    return await this.linksService.getOriginalLink(code);
  }
  @Post('/createurlshortened')
  async createLink(@Body() link?: CreateLinkDTO) {
    const createdCard = await this.linksService.createLink(link);
    return createdCard;
  }
  @Delete('/delete/:code')
  async deleteUrlShortened(@Param('code') code: string) {
    return await this.linksService.deleteUrlShortened(code);
  }
  @Put('/updateurl')
  async updateUrlShortened(@Body() body: any) {
    return await this.linksService.updateUrlShortened(body);
  }
}
