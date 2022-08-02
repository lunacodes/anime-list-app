import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Webtoon } from './models/Webtoon';
// import { connect } from 'mongoose';

// Routes
import home from './routes/home';
import webtoonRouter from './routes/webtoon';

// Environment Variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI;
const app: Express = express();

// Express App Setup
app.use(express.json());
app.use('/', home);
app.use(webtoonRouter);

// Run the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
