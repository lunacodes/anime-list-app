import { Schema, model, connect } from 'mongoose';
import { Webtoon } from '../../models/Webtoon';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';

export async function addWebtoon() {
  // 4. Connect to MongoDB
  await connect(dbURI, { dbName: 'sample' });

  const webtoon = new Webtoon({
    title: 'TS Test 4',
    score: 'TS Test 4',
    progress: 'TS Test 4',
    tags: 'TS Test 4',
  });
  await webtoon.save();

  console.log(webtoon.title);
}
