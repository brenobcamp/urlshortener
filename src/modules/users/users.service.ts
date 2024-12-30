import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from '../auth/dto/auth.dto';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(username: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email: username } });
  }
  async createOne(userData: UserDTO): Promise<User | undefined> {
    return await this.prisma.user.create({ data: userData });
  }
}
