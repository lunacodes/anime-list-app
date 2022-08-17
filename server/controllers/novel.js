import mongoose from 'mongoose';
import { Novel } from '../models/Novel.js';
import dotenv from 'dotenv';
const { connect } = mongoose;

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'novels';
const options = { dbName: dbName };

// Add Novel
export async function addNovel(res, title, score, progress, tags) {
	await connect(dbURI, options);

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

// Find Novel
export async function findNovelById(res, id) {
	await connect(dbURI, options);
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
	await connect(dbURI, options);
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
	await connect(dbURI, options);

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
