import express from 'express';
import {
	addAnime,
	deleteAnimeById,
	fetchAnimes,
	findAnimeById,
	listAnimes,
	updateAnimeById,
} from '../animes/anime.service.js';

const AnimeRouter = express.Router();
AnimeRouter.use(express.json());

// Add a new anime
AnimeRouter.route('/add').post((req, res) => {
	const title = req.query.title;
	const score = req.query.score;
	const progress = req.query.progress;
	const tags = req.query.tags;

	addAnime(res, title, score, progress, tags);
});

// Delete a anime
AnimeRouter.route('/delete').delete((req, res) => {
	const id = req.body.id;

	deleteAnimeById(res, id);
});

// Fetch a anime
AnimeRouter.route('/fetch').get((req, res) => {
	const queryStr = req.query.query;

	fetchAnimes(res, queryStr);
});

// Find a single anime by ID
AnimeRouter.route('/:id').get((req, res) => {
	const id = req.body.id;
	// console.log(res);

	findAnimeById(res, id);
});

// List All Animes
AnimeRouter.route('').get((req, res) => {
	listAnimes(res);
});

// Update a anime by ID
AnimeRouter.route('/update/:id').post((req, res) => {
	const id = req.body.id;

	updateAnimeById(res, id);
});

export default AnimeRouter;
