import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UrlDTO } from './dto/urls.dto';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}
  async getOriginalUrl(code: string) {
    try {
      const document = await this.prisma.url.findUnique({
        where: { shortenedUrl: `${process.env.SERVER_ADDRESS}/${code}` },
      });
      const { originalUrl } = await this.prisma.url.update({
        where: { id: document.id },
        data: { accessCount: document.accessCount + 1 },
      });
      return originalUrl;
    } catch {
      throw new NotFoundException('Url Not Found');
    }
  }

  async getOriginalUrlDetails(code: string, authorId: number) {
    try {
      const document = await this.prisma.url.findUnique({
        where: {
          shortenedUrl: `${process.env.SERVER_ADDRESS}/${code}`,
          authorId: authorId,
        },
      });
      if (!document) {
        throw new NotFoundException('Url Not Found');
      }
      return document;
    } catch {
      throw new NotFoundException('Url Not Found');
    }
  }

  async getMyUrls(authorId: number) {
    const documents = await this.prisma.url.findMany({
      where: { authorId: authorId, excludedAt: null },
    });
    documents.forEach((url) => {
      delete url.id;
      delete url.authorId;
      delete url.excludedAt;
    });
    return documents;
  }

  async getAllUrls() {
    try {
      const docs = await this.prisma.url.findMany();
      console.log(docs);
      return await this.prisma.url.findMany();
    } catch {
      throw new NotFoundException();
    }
  }

  async createShortUrl(url: string, request) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let urlShortenedCode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      urlShortenedCode += characters.charAt(randomIndex);
    }
    const shortenedUrl = `${process.env.SERVER_ADDRESS}/${urlShortenedCode}`;
    const search = await this.prisma.url.findUnique({
      where: { shortenedUrl: shortenedUrl },
    });
    if (!search) {
      const document = await this.prisma.url.create({
        data: {
          originalUrl: url,
          shortenedUrl: shortenedUrl,
          authorId: request?.user?.sub ?? null,
        },
      });
      return document;
    } else {
      this.createShortUrl(url, request);
    }
  }

  async updateUrl(body: UrlDTO, code: string, authorId: number) {
    try {
      const documentUpdate = await this.prisma.url.update({
        where: {
          shortenedUrl: `${process.env.SERVER_ADDRESS}/${code}`,
          authorId: authorId,
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

  async deleteUrl(code: string, authorId: number) {
    try {
      const documentUpdate = await this.prisma.url.update({
        where: {
          shortenedUrl: `${process.env.SERVER_ADDRESS}/${code}`,
          authorId: authorId,
          excludedAt: null,
        },
        data: { excludedAt: new Date() },
      });
      if (documentUpdate) {
        return { message: `Url with ${code} code excluded` };
      }
    } catch {
      throw new BadRequestException('Url not found or already excluded');
    }
  }
}
