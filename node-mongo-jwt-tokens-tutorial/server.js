import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// Local File System
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// Authentication
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import jwt from './_helpers/jwt.js';
import errorHandler from './middleware/error-handler.js';
import createTestUser from './_helpers/create-test-user.js';
import UserRouter from './users/users.controller.js';
// import DocsRouter from './_helpers/swagger.js';
createTestUser();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
	cors({
		origin: (origin, callback) => callback(null, true),
		credentials: true,
	})
);

// api routes
app.use(UserRouter);
// app.use(DocsRouter);
app.use(errorHandler);

const port =
	process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
	console.log('Server listening on port ' + port);
});
