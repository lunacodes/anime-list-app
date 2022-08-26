import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Local File System
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Authentication
import bodyParser from 'body-parser';
import jwt from './_helpers/jwt.js';
import errorHandler from './_helpers/error-handler.js';
// Routes
import novelRouter from './routes/novel.js';
import UserRouter from './routes/user.js';

// Environment Variables
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8081;

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(',')
	: [];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},

	credentials: true,
};

// App Setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(jwt());
app.use(errorHandler);
app.use(UserRouter);
app.use('/users', UserRouter);
app.use('/novels', novelRouter);

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(PORT, function () {
	const port = server.address().port;

	console.log('App started at port:', port);
});
