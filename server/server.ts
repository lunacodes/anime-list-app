import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Novel } from './models/Novel';
import { User } from './models/User';
// import { connect } from 'mongoose';

// Routes
import home from './routes/home';
import novelRouter from './routes/novel';
import userRouter from './routes/user';

// Environment Variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI;
const app: Express = express();

// Express App Setup
app.use(express.json());
app.use('/', home);
app.use(novelRouter);
app.use(userRouter);

// Run the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
