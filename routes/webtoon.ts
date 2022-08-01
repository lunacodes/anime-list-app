import express from 'express';
import { addWebtoon } from '../controllers/webtoons/addWebtoon';

const webtoonRouter = express.Router();

webtoonRouter.route('/webtoon').get((req, res) => {
  res.send('This will be how you view webtoons');
  // listWebtoons(res);
});

webtoonRouter.route('/webtoon/:id').get((req, res) => {
  res.send('This will be how you view a specific webtoon');
  // findWebtoonById(res, myQuery);
});

webtoonRouter.route('/webtoon/add').post((req, res) => {
  res.send('This will be how you add a webtoon');
  let title: string = 'req.body.title';
  let score: string = 'req.body.score';
  let progress: string = 'req.body.progress';
  let tags: string = 'req.body.tags';

  async function addNewWebtoon(
    res: any,
    title: string,
    score: string,
    progress: string,
    tags: string
  ) {
    await addWebtoon().catch((err: string) => console.log(err));
  }

  addNewWebtoon(res, title, score, progress, tags);
});

webtoonRouter.route('/webtoon/udpate/:id').post((req, res) => {
  res.send('This will be how you update a webtoon');
  // updateWebtoonById(res, myId, newValues);
});

webtoonRouter.route('/:id').delete((req, res) => {
  res.send('This will be how you delete a webtoon');
  // deleteWebtoonById(res, myId);
});

export default webtoonRouter;
