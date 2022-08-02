import { connect } from 'mongoose';
import { Webtoon } from '../models/Webtoon';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'error';
const options = { dbName: dbName };

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
