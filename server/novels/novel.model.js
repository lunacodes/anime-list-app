import mongoose from 'mongoose';
const { model, Schema, ObjectId } = mongoose;

const novelSchema = new Schema(
	{
		title: { type: String, required: true },
		score: { type: Number, required: true },
		progress: { type: String, required: true },
		tags: { type: [String], required: true },
		id: { type: [ObjectId], required: false },
	},
	{ collection: 'novels' }
);

const Novel = model('Novel', novelSchema);
export default Novel;
