import Novel from '../novels/novel.model.js';
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

describe('Novel Model', () => {
	let validNovel = {
		title: 'Sword Art Online',
		score: 10,
		progress: 'Finished',
		tags: ['SAO', 'Fantasy', 'Sci-Fi'],
	};

	it('creates a novel item successfully', async () => {
		const newNovel = await Novel(validNovel);
		await newNovel.save();
		expect(newNovel._id).toBeDefined();
		expect(newNovel.title).toBe(validNovel.title);
		expect(newNovel.score).toBe(validNovel.score);
		expect(newNovel.progress).toBe(validNovel.progress);
		expect(JSON.stringify(newNovel.tags)).toBe(JSON.stringify(validNovel.tags));
	});

	it('deletes a novel successfully', async () => {
		const newNovel = await Novel(validNovel);
		expect(newNovel._id).toBeDefined();
		expect(Novel.findById(newNovel._id)).toBeDefined();
		Novel.findByIdAndDelete(newNovel._id);
		expect(Novel.findById(newNovel._id)._id).toBeUndefined();
	});
});
