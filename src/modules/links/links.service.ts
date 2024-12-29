import { Injectable } from '@nestjs/common';
import { CreateLinkDTO } from './dto/links.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}
  async getOriginalLink(code: string) {
    try {
      const document = await this.prisma.url.findUnique({
        where: { shortenedUrl: code },
      });
      if (document.excluded) return { message: '' };
      const documentUpdate = await this.prisma.url.update({
        where: { id: document.id },
        data: { accessCount: document.accessCount + 1 },
      });
      return {
        originalUrl: documentUpdate.originalUrl,
        accessCount: documentUpdate.accessCount,
      };
    } catch {
      return { message: 'Url Not Found' };
    }
  }

  async createLink({ originalLink }: CreateLinkDTO) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let urlShortenedCode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      urlShortenedCode += characters.charAt(randomIndex);
    }
    const search = await this.prisma.url.findUnique({
      where: { shortenedUrl: urlShortenedCode },
    });
    if (!search) {
      const document = await this.prisma.url.create({
        data: {
          originalUrl: originalLink,
          shortenedUrl: urlShortenedCode,
        },
      });
      return document;
    } else {
      this.createLink({ originalLink });
    }
  }
  async getAllUrls() {
    return await this.prisma.url.findMany();
  }
  async deleteUrlShortened(code: string) {
    const documentUpdate = await this.prisma.url.update({
      where: { shortenedUrl: code },
      data: { excluded: new Date() },
    });
    if (documentUpdate) {
      return { message: `Url with ${code} code excluded` };
    } else {
      return new Error('url not found');
    }
  }
  async updateUrlShortened(body: any) {
    return { message: 'update route' };
  }
}
