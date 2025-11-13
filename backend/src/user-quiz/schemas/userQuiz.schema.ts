import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserQuizDocument = UserQuiz & Document;

@Schema({ timestamps: true })
export class UserQuiz {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;
}

export const UserQuizSchema = SchemaFactory.createForClass(UserQuiz);
