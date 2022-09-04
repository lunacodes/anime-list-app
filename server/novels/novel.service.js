import Novel from '../novels/novel.model.js';
import fetch from 'cross-fetch';

// Add Novel
export async function addNovel(res, title, score, progress, tags) {
	const novel = new Novel({
		title: title,
		score: score,
		progress: progress,
		tags: tags,
	});
	await novel.save();

	console.log('Novel was added:\n', novel);
	res.json(novel);
}

// Delete Novel
export async function deleteNovelById(res, id) {
	Novel.findByIdAndDelete(id, (err, novel) => {
		if (err) {
			console.log(err);
		} else {
			res.json(novel);
			console.log(`Deleted novel: ${novel}`);
		}
	});
}

// Fetch novels
export function fetchNovels(res, queryStr) {
	const base = '//kitsu.io/api/edge/anime';
	const url = queryStr.length > 0 ? `${base}?filter[text]=${queryStr}` : base;

	fetch(url)
		.then((res) => {
			if (res.status >= 400) {
				throw new Error(`Bad response from server: ${res.status}`);
			}
			return res.json();
		})
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
		});
}

// Find Novel
export async function findNovelById(res, id) {
	Novel.findById(id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			res.json(result);
		}
	});
}

// List All Novels
export async function listNovels(res) {
	Novel.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('displayed novels');
			res.json(result);
		}
	});
}

// Update Novel
export async function updateNovelById(res, id) {
	const newValues = {
		title: res.query.title,
		score: res.query.score,
		progress: res.query.progress,
		tags: res.query.tags,
	};

	Novel.findByIdAndUpdate(id, newValues, (err, novel) => {
		console.log(id);
		console.log(`new values: \n${newValues}`);

		if (err) {
			console.log(err);
		} else {
			res.json(novel);
			console.log(`Updated novel: ${novel}`);
		}
	});
}
