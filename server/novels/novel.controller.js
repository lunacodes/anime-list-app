import express from 'express';
import {
	addNovel,
	deleteNovelById,
	fetchNovels,
	findNovelById,
	listNovels,
	updateNovelById,
} from '../novels/novel.service.js';

const NovelRouter = express.Router();
NovelRouter.use(express.json());

// Add a new novel
NovelRouter.route('/add').post((req, res) => {
	const title = req.query.title;
	const score = req.query.score;
	const progress = req.query.progress;
	const tags = req.query.tags;

	addNovel(res, title, score, progress, tags);
});

// Delete a novel
NovelRouter.route('/delete').delete((req, res) => {
	const id = req.body.id;

	deleteNovelById(res, id);
});

// Fetch all novels
NovelRouter.route('/fetch').get((req, res) => {
	const queryStr = req.query.query;

	fetchNovels(res, queryStr);
});

// Find a single novel by ID
NovelRouter.route('/:id').get((req, res) => {
	const id = req.body.id;
	// console.log(res);

	findNovelById(res, id);
});

// List All Novels
NovelRouter.route('').get((req, res) => {
	listNovels(res);
});

// Update a novel by ID
NovelRouter.route('/update/:id').post((req, res) => {
	const id = req.body.id;

	updateNovelById(res, id);
});

export default NovelRouter;
