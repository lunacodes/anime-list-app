import express from 'express';
const UserRouter = express.Router();
// import { User } from '../models/User.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
	// addUser,
	// deleteUserById,
	// findUserById,
	// listUsers,
	loginUser,
	logoutUser,
	refreshUserToken,
	registerUser,
	// updateUserById,
} from '../controllers/user.js';

import {
	getToken,
	// COOKIE_OPTIONS,
	getRefreshToken,
	verifyUser,
} from '../authenticate.js';

// Get User
UserRouter.get('/me', verifyUser, (req, res, next) => {
	res.send(req.user);
});

// Login User
UserRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
	const id = req.user._id;
	const token = getToken({ _id: req.user._id });
	const refreshToken = getRefreshToken({ _id: req.user._id });

	loginUser(res, id, token, refreshToken, next);
});

// Logout User
UserRouter.get('/logout', verifyUser, (req, res, next) => {
	const id = req.user._id;
	console.log(req);
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	logoutUser(res, id, refreshToken, next);
});

// Refresh User Token
UserRouter.post('/refreshToken', (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;

	if (refreshToken) {
		try {
			const payload = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			const userId = payload._id;
			refreshUserToken(res, userId, refreshToken);
		} catch (err) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
	} else {
		res.statusCode = 401;
		res.send('Unauthorized');
	}
});

// Signup User
UserRouter.post('/signup', (req, res, next) => {
	// Verify that first name is not empty
	if (!req.body.firstName) {
		res.statusCode = 500;
		res.send({
			name: 'FirstNameError',
			message: 'The first name is required',
		});
	} else {
		registerUser(req, res, next);
	}
});

export default UserRouter;
