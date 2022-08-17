import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Routes
import novelRouter from './routes/novel.js';
import userRouter from './routes/user.js';

// Environment Variables
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const app = express();
// const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';
const options = {
	origin: '*',
};

app.use(cors(options));
app.use(express.json());
app.use(novelRouter);
app.use(userRouter);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
