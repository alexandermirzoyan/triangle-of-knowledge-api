import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { State } from '../enums/state.enum';
import { User } from '../../users/schemas/user.schema';

export type KnowledgeListDocument = HydratedDocument<KnowledgeList>;

@Schema()
export class KnowledgeList {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: State })
  state: State;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

// Create the schema factory for the KnowledgeList schema
export const KnowledgeListSchema = SchemaFactory.createForClass(KnowledgeList);

KnowledgeListSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

KnowledgeListSchema.set('toJSON', { virtuals: true }); // Ensure `id` shows up in JSON responses
