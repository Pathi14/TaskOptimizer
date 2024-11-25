import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';
import { Statut, Prisma } from '@prisma/client';
import { CreateTagDto } from './tag.dto';
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(createTagDto);
  }

  @Get(':id')
  async getTag(@Param('id') id: number): Promise<Tag | null> {
    return this.tagService.getTag(Number(id));
  }

  @Get()
  async getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @Put(':id')
  async updateTag(@Param('id') id: number, @Body() data: Prisma.TagUpdateInput): Promise<Tag> {
    return this.tagService.updateTag(Number(id), data);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number): Promise<Tag> {
    return this.tagService.deleteTag(Number(id));
  }
}