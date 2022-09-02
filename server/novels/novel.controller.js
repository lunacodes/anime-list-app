import express from 'express';
import {
	addNovel,
	deleteNovelById,
	findNovelById,
	listNovels,
	updateNovelById,
} from '../novels/novel.service.js';
import fetch from 'cross-fetch';

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
	/**
	 * Example of subqueries that actually work:
	 * https://kitsu.io/api/edge/anime?filter[text]=sword%20art%20online
	 * /anime?page[limit]=5&page[offset]=0
	 * Limit can increase to 20
	 */

	fetch('//kitsu.io/api/edge/anime')
		.then((res) => {
			if (res.status >= 400) {
				throw new Error('Bad response from server');
			}
			return res.json();
		})
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
		});
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
