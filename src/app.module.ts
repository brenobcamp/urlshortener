import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UrlsModule } from './modules/urls/urls.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UrlsModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
