import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Tag, Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async getTag(id: number): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
        taches: true,
      },
    });
  }

  async getTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      include: {
        taches: true,
      },
    });
  }

  async updateTag(id: number, data: Prisma.TagUpdateInput): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}