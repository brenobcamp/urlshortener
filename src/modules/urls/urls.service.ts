import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UrlDTO } from './dto/urls.dto';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}
  async getOriginalUrl(code: string) {
    try {
      const document = await this.prisma.url.findUnique({
        where: { shortenedUrl: code },
      });
      if (document.excludedAt)
        throw new BadRequestException(
          `This url code was excluded at ${document.excludedAt}`,
        );
      const documentUpdate = await this.prisma.url.update({
        where: { id: document.id },
        data: { accessCount: document.accessCount + 1 },
      });
      return {
        originalUrl: documentUpdate.originalUrl,
        accessCount: documentUpdate.accessCount,
      };
    } catch {
      throw new NotFoundException('Url Not Found');
    }
  }

  async getAllMyUrls(authorId: number) {
    return await this.prisma.url.findMany({
      where: { authorId: authorId },
    });
  }

  async createShortUrl(url: string, request) {
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
          originalUrl: url,
          shortenedUrl: urlShortenedCode,
          authorId: request?.user?.sub ?? null,
        },
      });
      return document;
    } else {
      this.createShortUrl(url, request);
    }
  }

  async getAllUrls() {
    return await this.prisma.url.findMany();
  }
  async deleteUrl(code: string) {
    try {
      const documentUpdate = await this.prisma.url.update({
        where: { shortenedUrl: code, excludedAt: null },
        data: { excludedAt: new Date() },
      });
      if (documentUpdate) {
        return { message: `Url with ${code} code excluded` };
      }
    } catch {
      throw new BadRequestException('Url not found or already excluded');
    }
  }
  async updateUrlShortened(body: UrlDTO, code: string, request) {
    try {
      const documentUpdate = await this.prisma.url.update({
        where: {
          shortenedUrl: code,
          authorId: request.user.sub,
          excludedAt: null,
        },
        data: { originalUrl: body.url, updatedAt: new Date() },
      });
      if (documentUpdate) {
        return { message: `Url with ${code} code updated.` };
      }
    } catch {
      throw new BadRequestException('Url not found');
    }
  }
}
