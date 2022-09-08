import mongoose from 'mongoose';
const { model, Schema, ObjectId } = mongoose;

const animeSchema = new Schema(
	{
		title: { type: String, required: true },
		score: { type: Number, required: true },
		progress: { type: String, required: true },
		tags: { type: [String], required: true },
		id: { type: [ObjectId], required: false },
	},
	{ collection: 'animes' }
);

const Anime = model('Anime', animeSchema);
export default Anime;
