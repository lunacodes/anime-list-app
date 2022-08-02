import { connect, Schema, ObjectId, model } from 'mongoose';
import express from 'express';
import {
  addWebtoon,
  deleteWebtoonById,
  findWebtoonById,
  listWebtoons,
  updateWebtoonById,
} from '../controllers/webtoon';
import { Webtoon } from '../models/Webtoon';
import dotenv from 'dotenv';

const webtoonRouter = express.Router();
webtoonRouter.use(express.json());

// List All Webtoons
webtoonRouter.route('/webtoon').get((req, res) => {
  listWebtoons(res);
});

// Find a single webtoon by ID
webtoonRouter.route('/webtoon/:id').get((req, res) => {
  let id: any = req.params.id;
  console.log(res);

  findWebtoonById(res, id);
});

// Add a new webtoon
webtoonRouter.route('/webtoon/add').post((req, res) => {
  let title: any = req.query.title;
  let score: any = req.query.score;
  let progress: any = req.query.progress;
  let tags: any = req.query.tags;

  addWebtoon(res, title, score, progress, tags);
});

// Update a webtoon by ID
webtoonRouter.route('/webtoon/update/:id').post((req, res) => {
  let id: any = req.params.id;

  updateWebtoonById(res, id);
});

// Delete a webtoon
webtoonRouter.route('/webtoon/delete/:id').delete((req, res) => {
  let id: any = req.params.id;

  deleteWebtoonById(res, id);
});

export default webtoonRouter;
