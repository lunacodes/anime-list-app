import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface INovel {
  title?: string;
  score?: number;
  progress?: string;
  tags?: string;
}

// 2. Create a Schema corresponding to the document interface.
const novelSchema = new Schema<INovel>({
  title: { type: String, required: true },
  score: { type: Number, required: true },
  progress: { type: String, required: true },
  tags: { type: String, required: true },
});

// 3. Create a Model.
export const Novel = model<INovel>('Novel', novelSchema);
