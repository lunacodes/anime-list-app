import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Routes
// import home from './routes/home';
import novelRouter from './routes/novel';
import userRouter from './routes/user';

// Environment Variables
dotenv.config();
const PORT = process.env.PORT || 3001;

// Express App Setup
const app: Express = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(novelRouter);
app.use(userRouter);

// app.get('*', (req, res) => {
//   console.log('Main path');
//   console.log(path.resolve(__dirname, '../../client/build', 'index.html'));
//   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
// });

app.use(express.static(path.resolve(__dirname, '../../client/build')));

// Run the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
