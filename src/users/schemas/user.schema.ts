import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Gender } from '../enums/gender.enum';
import * as mongoose from 'mongoose';
import { KnowledgeList } from '../../knowledge-list/schemas/knowledge-list.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone_number?: string;

  @Prop()
  date_of_birth?: Date;

  @Prop()
  country?: string;

  @Prop()
  profession?: string;

  @Prop({ enum: Gender })
  gender: Gender;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeList' }],
  })
  knowledge_list: KnowledgeList[];
}

// Create the schema factory for the User schema
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', { virtuals: true }); // Ensure `id` shows up in JSON responses
