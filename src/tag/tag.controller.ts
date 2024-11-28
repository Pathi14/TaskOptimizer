import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, ConflictException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';
import { Statut, Prisma } from '@prisma/client';
import { CreateTagDto } from './tag.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller()
@UseGuards(AuthGuard('jwt'))
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    if (!createTagDto.type_tag) {
      throw new BadRequestException('Missing required fields');
    }

    if (!createTagDto) {
      throw new BadRequestException('None value to update');
    }

    try {
      return this.tagService.createTag(createTagDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
          throw error;
      }
      throw new BadRequestException('Invalid request');
    };
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
    if (!data) {
      throw new BadRequestException('None value to update');
    }
    try {
      return this.tagService.updateTag(Number(id), data);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
          throw error;
      }
      throw new BadRequestException('Invalid request');
    }
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number): Promise<{ message: string }> {
    if(id === undefined || id === null){
      throw new BadRequestException('Missing required fields');
    }

    try {
        await this.tagService.deleteTag(Number(id));
        return { message: `Task with ID ${id} has been deleted successfully.` };
    } catch (error) {
        if (error.message.includes('not found')) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}