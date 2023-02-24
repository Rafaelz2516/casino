import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  _id: ObjectId;

  @Prop({ unique: true, type: String })
  name: string;

  @Prop({ unique: true, type: String })
  description: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
