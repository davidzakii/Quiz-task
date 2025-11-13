import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SemesterDocument = Semester & Document;

@Schema({ timestamps: true })
export class Semester {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
