import mongoose from 'mongoose';
const { model, Schema, ObjectId } = mongoose;

const novelSchema = new Schema(
	{
		title: { type: [String], required: true },
		score: { type: [Number], required: true },
		progress: { type: [String], required: true },
		tags: { type: [String], required: true },
		id: { type: [ObjectId], required: false },
	},
	{ collection: 'users' }
);

// 3. Create a Model.
export const Novel = model('Novel', novelSchema);
