import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Local File System
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Authentication
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error-handler.js';
import createTestUser from './_helpers/create-test-user.js';
// Routes
import novelRouter from './novels/novel.controller.js';
import UserRouter from './users/user.controller.js';
createTestUser(); // Deactivate this once I've got the User Model set up properly again

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
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(errorHandler);
app.use(UserRouter);
app.use('/novels', novelRouter);
app.use(errorHandler);

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(PORT, function () {
	const port = server.address().port;

	console.log('App started at port:', port);
});
