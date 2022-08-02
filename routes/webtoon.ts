import { connect, Schema, ObjectId, model } from 'mongoose';
import express from 'express';
// import { addWebtoon } from '../controllers/webtoons/addWebtoon';
import { Webtoon } from '../models/Webtoon';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'error';
const options = { dbName: dbName };

const app = express();

const webtoonRouter = express.Router();
webtoonRouter.use(express.json());

webtoonRouter.route('/webtoon').get((req, res) => {
  // res.send('This will be how you view webtoons');
  // listWebtoons(res);

  async function listWebtoons() {
    await connect(dbURI, options);
    Webtoon.find({}, (err: any, result: any) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }

  listWebtoons();
});

// Find a single webtoon by ID
webtoonRouter.route('/webtoon/:id').get((req, res) => {
  let id: any = req.params.id;

  async function findWebtoonById() {
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

  findWebtoonById();
});

// Add a new webtoon
webtoonRouter.route('/webtoon/add').post((req, res) => {
  let title: any = req.query.title;
  let score: any = req.query.score;
  let progress: any = req.query.progress;
  let tags: any = req.query.tags;

  console.log(title);
  async function addNewWebtoon(
    res: any,
    title: any,
    score: any,
    progress: any,
    tags: any
  ) {
    await connect(dbURI, options);

    const webtoon = new Webtoon({
      title: `${title}`,
      score: `${score}`,
      progress: `${progress}`,
      tags: `${tags}`,
    });
    await webtoon.save();
    res.send('This will be how you add a webtoon');

    console.log(webtoon);
  }

  addNewWebtoon(res, title, score, progress, tags);
});

// Update a webtoon by ID
webtoonRouter.route('/webtoon/update/:id').post((req, res) => {
  let id: any = req.params.id;

  async function updateWebtoonById() {
    await connect(dbURI, options);

    const newValues = {
      title: req.query.title,
      score: req.query.score,
      progress: req.query.progress,
      tags: req.query.tags,
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

  updateWebtoonById();
});

// Delete a webtoon
webtoonRouter.route('/:id').delete((req, res) => {
  res.send('This will be how you delete a webtoon');
  // deleteWebtoonById(res, myId);
});

export default webtoonRouter;
