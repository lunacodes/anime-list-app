import { connect, Types } from 'mongoose';
import { Novel } from '../models/Novel';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'novels';
const options = { dbName: dbName };

// Add Novel
export async function addNovel(
  res: any,
  title: any,
  score: any,
  progress: any,
  tags: any
) {
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
export async function deleteNovelById(res: any, id: Types.ObjectId) {
  Novel.findByIdAndDelete(id, (err: any, novel: any) => {
    if (err) {
      console.log(err);
    } else {
      res.json(novel);
      console.log(`Deleted novel: ${novel}`);
    }
  });
}

// Find Novel
export async function findNovelById(res: any, id: Types.ObjectId) {
  await connect(dbURI, options);
  Novel.findById(id, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

// List All Novels
export async function listNovels(res: any) {
  await connect(dbURI, options);
  Novel.find({}, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log('displayed novels');
      res.json(result);
    }
  });
}

// Update Novel
export async function updateNovelById(res: any, id: Types.ObjectId) {
  await connect(dbURI, options);

  const newValues = {
    title: res.query.title,
    score: res.query.score,
    progress: res.query.progress,
    tags: res.query.tags,
  };

  Novel.findByIdAndUpdate(id, newValues, (err: any, novel: any) => {
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
