import { Module } from '@nestjs/common';
import { LinksModule } from './modules/links/links.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [LinksModule],
  providers: [PrismaService],
})
export class AppModule {}
