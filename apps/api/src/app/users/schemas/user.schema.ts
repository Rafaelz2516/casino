import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: ObjectId;

  @Prop({ unique: true, type: String })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  @Prop({ default: 100, type: Number })
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
