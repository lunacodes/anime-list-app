import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from './_helpers/jwt.js';
import errorHandler from './_helpers/error-handler.js';
import UserRouter from './routes/user.js';
// import * as userController from './users/user.controller.js';
// const { authenticate, getAll } = userController;
// import authenticate from './users/user.controller.js';
// import getAll from './users/user.controller.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(UserRouter);

// use JWT auth to secure the api
app.use(jwt());

// api routes
// app.use('/', getAll);
// app.use('/authenticate', authenticate);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
