import Anime from '../animes/anime.model.js';
import { connectDB, dropDB, dropCollections } from './db-handler.js';

beforeAll(async () => {
	await connectDB();
});

afterAll(async () => {
	await dropDB();
});

afterEach(async () => {
	await dropCollections();
});

describe('Anime Model', () => {
	let validAnime = {
		title: 'Sword Art Online',
		score: 10,
		progress: 'Finished',
		tags: ['SAO', 'Fantasy', 'Sci-Fi'],
	};

	it('creates an anime item successfully', async () => {
		const newAnime = await Anime(validAnime);
		await newAnime.save();
		expect(newAnime._id).toBeDefined();
		expect(newAnime.title).toBe(validAnime.title);
		expect(newAnime.score).toBe(validAnime.score);
		expect(newAnime.progress).toBe(validAnime.progress);
		expect(JSON.stringify(newAnime.tags)).toBe(JSON.stringify(validAnime.tags));
	});

	it('deletes an anime successfully', async () => {
		const newAnime = await Anime(validAnime);
		expect(newAnime._id).toBeDefined();
		expect(Anime.findById(newAnime._id)).toBeDefined();
		Anime.findByIdAndDelete(newAnime._id);
		expect(Anime.findById(newAnime._id)._id).toBeUndefined();
	});
});
