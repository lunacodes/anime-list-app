import { connect, Schema, ObjectId, model } from 'mongoose';
import express from 'express';
import {
  addNovel,
  deleteNovelById,
  findNovelById,
  listNovels,
  updateNovelById,
} from '../controllers/novel';
import { Novel } from '../models/Novel';
import fetch from 'cross-fetch';

const novelRouter = express.Router();
novelRouter.use(express.json());

// Add a new novel
novelRouter.route('/novel/add').post((req, res) => {
  let title: any = req.query.title;
  let score: any = req.query.score;
  let progress: any = req.query.progress;
  let tags: any = req.query.tags;

  addNovel(res, title, score, progress, tags);
});

// Delete a novel
novelRouter.route('/novel/delete/:id').delete((req, res) => {
  let id: any = req.params.id;

  deleteNovelById(res, id);
});

// Fetch all novels
novelRouter.route('/fetch').get((req, res) => {
  /**
   * Example of subqueries that actually work:
   * https://kitsu.io/api/edge/anime?filter[text]=sword%20art%20online
   * /anime?page[limit]=5&page[offset]=0
   * Limit can increase to 20
   */

  fetch('//kitsu.io/api/edge/anime')
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Find a single novel by ID
novelRouter.route('/novel/:id').get((req, res) => {
  let id: any = req.params.id;
  console.log(res);

  findNovelById(res, id);
});

// List All Novels
novelRouter.route('/novel').get((req, res) => {
  listNovels(res);
});

// Update a novel by ID
novelRouter.route('/novel/update/:id').post((req, res) => {
  let id: any = req.params.id;

  updateNovelById(res, id);
});

export default novelRouter;
