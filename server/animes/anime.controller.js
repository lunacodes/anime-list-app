import express from 'express';
import { fetchAnimes } from '../animes/anime.service.js';

const AnimeRouter = express.Router();
AnimeRouter.use(express.json());

// Fetch Anime
AnimeRouter.route('/fetch').get((req, res) => {
	const queryStr = req.query.query;

	fetchAnimes(res, queryStr);
});

export default AnimeRouter;
