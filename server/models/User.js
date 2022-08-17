import mongoose from 'mongoose';
const { model, Schema, ObjectId } = mongoose;

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true, index: true, unique: true },
		id: { type: ObjectId, required: false },
	},
	{ collection: 'users' }
);

// 3. Create a Model.
export const User = model('User', userSchema);
