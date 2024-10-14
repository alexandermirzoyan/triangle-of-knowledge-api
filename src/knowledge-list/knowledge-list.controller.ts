import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { KnowledgeListService } from './knowledge-list.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDocument } from '../users/schemas/user.schema';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateKnowledgeDto } from './dtos/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dtos/update-knowledge.dto';
import { IsVerifiedGuard } from '../auth/guards/is-verified.guard';
import { plainToInstance } from 'class-transformer';
import { KnowledgeDto } from './dtos/knowledge.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('KnowledgeList')
@Controller('knowledge-list')
export class KnowledgeListController {
  constructor(private readonly knowledgeListService: KnowledgeListService) {}

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
  @Get()
  @ApiOperation({ summary: 'Get all knowledge list of current user' })
  async getAll(
    @CurrentUser() user: UserDocument,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.knowledgeListService.findAllForUser(user.id, +page, +limit);
  }

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
  @Post()
  @ApiOperation({ summary: 'Create new knowledge' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createKnowledgeDto: CreateKnowledgeDto,
    @CurrentUser() user: UserDocument,
  ) {
    const knowledge = this.knowledgeListService.create(
      createKnowledgeDto,
      user,
    );

    return plainToInstance(KnowledgeDto, knowledge, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update knowledge for current user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') knowledgeId: string,
    @Body() updateKnowledgeDto: UpdateKnowledgeDto,
    @CurrentUser() user: UserDocument,
  ) {
    const knowledge = this.knowledgeListService.update(
      knowledgeId,
      updateKnowledgeDto,
      user,
    );

    return plainToInstance(KnowledgeDto, knowledge, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete knowledge of current user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') knowledgeId: string,
    @CurrentUser() user: UserDocument,
  ) {
    await this.knowledgeListService.delete(knowledgeId, user);
  }
}
