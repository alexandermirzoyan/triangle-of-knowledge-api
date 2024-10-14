import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { KnowledgeListDocument } from './schemas/knowledge-list.schema';
import { CreateKnowledgeDto } from './dtos/create-knowledge.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { UpdateKnowledgeDto } from './dtos/update-knowledge.dto';
import { plainToInstance } from 'class-transformer';
import { KnowledgeDto } from './dtos/knowledge.dto';

@Injectable()
export class KnowledgeListService {
  constructor(
    @InjectModel('KnowledgeList')
    private readonly knowledgeModel: Model<KnowledgeListDocument>,
  ) {}

  // Fetch paginated knowledge list for the current user
  async findAllForUser(
    userId: Types.ObjectId,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: KnowledgeDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;
    const total = await this.knowledgeModel
      .countDocuments({ user: userId })
      .exec();
    const data = await this.knowledgeModel
      .find({ user: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    const transformedData = plainToInstance(KnowledgeDto, data, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedData,
      total,
      page,
      limit,
    };
  }

  async create(
    createKnowledgeDto: CreateKnowledgeDto,
    user: UserDocument,
  ): Promise<KnowledgeDto> {
    const newKnowledge = new this.knowledgeModel({
      ...createKnowledgeDto,
      user: user.id, // Associate knowledge with the current user
    });

    const result = await newKnowledge.save();

    return plainToInstance(KnowledgeDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    knowledgeId: string,
    updateKnowledgeDto: UpdateKnowledgeDto,
    user: UserDocument,
  ): Promise<KnowledgeDto> {
    // Find the knowledge entry by ID and author
    const knowledge = await this.knowledgeModel.findOne({
      _id: knowledgeId,
      user: user.id,
    });

    if (!knowledge) {
      throw new NotFoundException(
        'Knowledge entry not found or you do not have permission to update it.',
      );
    }

    // Apply the updates
    Object.assign(knowledge, updateKnowledgeDto);
    const result = await knowledge.save();

    return plainToInstance(KnowledgeDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async delete(knowledgeId: string, user: UserDocument): Promise<void> {
    // Find the knowledge entry by ID and ensure it belongs to the user
    const knowledge = await this.knowledgeModel.findOne({
      _id: knowledgeId,
      user: user.id,
    });

    if (!knowledge) {
      throw new NotFoundException(
        'Knowledge entry not found or you do not have permission to delete it.',
      );
    }

    // Use the deleteOne method to remove the knowledge entry
    await this.knowledgeModel.deleteOne({ _id: knowledgeId });
  }
}
