import { connect, Types } from 'mongoose';
import { Webtoon } from '../models/Webtoon';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'error';
const options = { dbName: dbName };

// Add Webtoon
export async function addWebtoon(
  res: any,
  title: any,
  score: any,
  progress: any,
  tags: any
) {
  await connect(dbURI, options);

  const webtoon = new Webtoon({
    title: title,
    score: score,
    progress: progress,
    tags: tags,
  });
  await webtoon.save();

  console.log('Webtoon was added:\n', webtoon);
  res.json(webtoon);
}

// Delete Webtoon
export async function deleteWebtoonById(res: any, id: Types.ObjectId) {
  Webtoon.findByIdAndDelete(id, (err: any, webtoon: any) => {
    if (err) {
      console.log(err);
    } else {
      res.json(webtoon);
      console.log(`Deleted webtoon: ${webtoon}`);
    }
  });
}

// Find Webtoon
export async function findWebtoonById(res: any, id: Types.ObjectId) {
  await connect(dbURI, options);
  Webtoon.findById(id, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

// List All Webtoons
export async function listWebtoons(res: any) {
  await connect(dbURI, options);
  Webtoon.find({}, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log('displayed webtoons');
      res.json(result);
    }
  });
}

// Update Webtoon
export async function updateWebtoonById(res: any, id: Types.ObjectId) {
  await connect(dbURI, options);

  const newValues = {
    title: res.query.title,
    score: res.query.score,
    progress: res.query.progress,
    tags: res.query.tags,
  };

  Webtoon.findByIdAndUpdate(id, newValues, (err: any, webtoon: any) => {
    console.log(id);
    console.log(`new values: \n${newValues}`);

    if (err) {
      console.log(err);
    } else {
      res.json(webtoon);
      console.log(`Updated webtoon: ${webtoon}`);
    }
  });
}
