import { Injectable } from '@nestjs/common';
import { LinkDTO } from './dto/links.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}
  async getFullLink(code: string) {
    return code;
  }

  async createLink(link: LinkDTO) {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    const newUrl =
      'https://3000-brenobcamp-urlshortener-bbop0itbbr3.ws-us117.gitpod.io/' +
      codigo;
    link.shortenedLink = newUrl;
    link.accessCount = 0;
    return link;
  }
}
