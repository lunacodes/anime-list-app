import { Types, model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id?: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  id: { type: Types.ObjectId, required: false },
});

// 3. Create a Model.
export const User = model<IUser>('User', UserSchema);
