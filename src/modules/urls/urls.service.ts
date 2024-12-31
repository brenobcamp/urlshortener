import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}
  async getOriginalUrl(urlCode: string) {
    try {
      const shortenedUrl = `${process.env.SERVER_ADDRESS}/${urlCode}`;
      const document = await this.prisma.url.findUnique({
        where: { shortenedUrl },
      });
      if (!document) {
        throw new NotFoundException('Url Not Found');
      }

      const { id, accessCount, originalUrl } = document;

      await this.prisma.url.update({
        where: { id },
        data: { accessCount: accessCount + 1 },
      });
      return originalUrl;
    } catch {
      throw new NotFoundException('Url Not Found');
    }
  }

  async getMyUrls(authorId: number) {
    try {
      const documents = await this.prisma.url.findMany({
        where: { authorId, excludedAt: null },
      });
      return documents.map(({ id, authorId, excludedAt, ...rest }) => rest);
    } catch {
      throw new NotFoundException('It was not possible to find your Urls');
    }
  }

  async getAllUrls() {
    try {
      const urls = await this.prisma.url.findMany();
      return { urls };
    } catch {
      throw new NotFoundException('It was not possible to find created Urls');
    }
  }

  async createShortUrl(originalUrl: string, request) {
    const generateCode = (length = 6) => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let urlCode = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        urlCode += characters.charAt(randomIndex);
      }
      return urlCode;
    };

    let shortenedUrl;
    let shortenedUrlCode;
    let codeAlreadyTaken;
    do {
      shortenedUrlCode = generateCode();
      shortenedUrl = `${process.env.SERVER_ADDRESS}/${shortenedUrlCode}`;
      codeAlreadyTaken = await this.prisma.url.findUnique({
        where: { shortenedUrl },
      });
    } while (codeAlreadyTaken);

    try {
      return await this.prisma.url.create({
        data: {
          originalUrl,
          shortenedUrl,
          authorId: request?.user?.sub ?? null,
        },
      });
    } catch {
      throw new Error('Could not create short URL');
    }
  }

  async getUrlDetails(urlCode: string, authorId: number) {
    try {
      const shortenedUrl = `${process.env.SERVER_ADDRESS}/${urlCode}`;
      const document = await this.prisma.url.findUnique({
        where: {
          shortenedUrl,
          authorId,
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

  async updateUrl(newUrl: string, urlCode: string, authorId: number) {
    try {
      const shortenedUrl = `${process.env.SERVER_ADDRESS}/${urlCode}`;
      const documentUpdate = await this.prisma.url.update({
        where: {
          shortenedUrl,
          authorId,
          excludedAt: null,
        },
        data: { originalUrl: newUrl, updatedAt: new Date() },
      });
      if (documentUpdate) {
        return {
          statusCode: 200,
          message: `Url with code ${urlCode} updated.`,
        };
      } else {
        throw new BadRequestException('Url Not Found');
      }
    } catch {
      throw new Error('Could not update URL');
    }
  }

  async deleteUrl(urlCode: string, authorId: number) {
    try {
      const shortenedUrl = `${process.env.SERVER_ADDRESS}/${urlCode}`;
      const documentUpdate = await this.prisma.url.update({
        where: {
          shortenedUrl,
          authorId,
          excludedAt: null,
        },
        data: { excludedAt: new Date() },
      });
      if (documentUpdate) {
        return {
          statusCode: 200,
          message: `Url with code ${urlCode} deleted`,
        };
      }
    } catch {
      throw new BadRequestException('Url not found or already excluded');
    }
  }
}
