import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IImageGeneration extends Document {
    _id?: string;
  userId: string;
  prompt: string;
  image: string;
  createdAt?: Date;
}

const imageGenerationSchema = new Schema<IImageGeneration>({
  userId: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ImageGeneration = model<IImageGeneration>(
  'ImageGeneration',
  imageGenerationSchema
);