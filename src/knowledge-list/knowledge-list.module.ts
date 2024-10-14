import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnowledgeListController } from './knowledge-list.controller';
import { KnowledgeListService } from './knowledge-list.service';
import {
  KnowledgeList,
  KnowledgeListSchema,
} from './schemas/knowledge-list.schema';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KnowledgeList.name, schema: KnowledgeListSchema },
    ]),
    UserModule,
  ],
  controllers: [KnowledgeListController],
  providers: [KnowledgeListService],
  exports: [KnowledgeListService],
})
export class KnowledgeListModule {}
