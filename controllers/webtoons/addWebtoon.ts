import { connect } from 'mongoose';
import { Webtoon } from '../../models/Webtoon';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'error';
const options = { dbName: dbName };

export async function addWebtoon() {
  await connect(dbURI, options);

  const webtoon = new Webtoon({
    title: 'TS Test 4',
    score: 'TS Test 4',
    progress: 'TS Test 4',
    tags: 'TS Test 4',
  });
  await webtoon.save();

  console.log(webtoon);
}
