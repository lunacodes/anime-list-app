import Anime from '../animes/anime.model.js';
import fetch from 'cross-fetch';

// Add Anime
export async function addAnime(res, title, score, progress, tags) {
	const anime = new Anime({
		title: title,
		score: score,
		progress: progress,
		tags: tags,
	});
	await anime.save();

	console.log('Anime was added:\n', anime);
	res.json(anime);
}

// Delete Anime
export async function deleteAnimeById(res, id) {
	Anime.findByIdAndDelete(id, (err, anime) => {
		if (err) {
			console.log(err);
		} else {
			res.json(anime);
			console.log(`Deleted anime: ${anime}`);
		}
	});
}

// Fetch animes
export function fetchAnimes(res, queryStr) {
	const base = '//kitsu.io/api/edge/anime';
	const url = queryStr.length > 0 ? `${base}?filter[text]=${queryStr}` : base;

	fetch(url)
		.then((res) => {
			if (res.status >= 400) {
				console.error(`Bad response from server: ${res.status}`);
				throw new Error(`Bad response from server: ${res.status}`);
			}
			return res.json();
		})
		.then((anime) => {
			res.json(anime);
		})
		.catch((err) => {
			console.error(err);
		});
}

// Find Anime
export async function findAnimeById(res, id) {
	Anime.findById(id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			res.json(result);
		}
	});
}

// List All Animes
export async function listAnimes(res) {
	Anime.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('displayed animes');
			res.json(result);
		}
	});
}

// Update Anime
export async function updateAnimeById(res, id) {
	const newValues = {
		title: res.query.title,
		score: res.query.score,
		progress: res.query.progress,
		tags: res.query.tags,
	};

	Anime.findByIdAndUpdate(id, newValues, (err, anime) => {
		console.log(id);
		console.log(`new values: \n${newValues}`);

		if (err) {
			console.log(err);
		} else {
			res.json(anime);
			console.log(`Updated anime: ${anime}`);
		}
	});
}
