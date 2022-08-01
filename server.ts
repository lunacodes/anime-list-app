import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
// import helmet from 'helmet';
import dotenv from 'dotenv';
// import './utils/connectDb';
import { Webtoon } from './models/Webtoon';
// import './sample';
import { Schema, model, connect } from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI;
// const app: Express = express();

run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect(`${ATLAS_URI}`, { dbName: 'sample' });

  const webtoon = new Webtoon({
    title: 'TS Test 2',
    score: 'TS Test 2',
    progress: 'TS Test 2',
    tags: 'TS Test 2',
  });
  await webtoon.save();

  console.log(webtoon.title);
}

// const PORT = process.env.PORT || 3000;
// const app: Express = express();

// app.use(helmet());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.get('/', (req: Request, res: Response) => {
//   res.send('<h1>Hello from the TypeScript world!</h1>');
// });
//
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
