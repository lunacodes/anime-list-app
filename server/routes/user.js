import express from 'express';
const UserRouter = express.Router();
import { User } from '../models/User.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import userService from '../users/user.service.js';
// import {
// 	addUser,
// 	deleteUserById,
// 	findUserById,
// 	listUsers,
// 	loginUser,
// 	updateUserById,
// } from '../controllers/user.js';

import {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
	verifyUser,
} from '../authenticate.js';

UserRouter.post('/users/authenticate', (req, res, next) => {
	userService
		.authenticate(req.body)
		.then((user) => res.json(user))
		.catch(next);
});

// REMOVE THIS BEFORE PRODUCTION!!!
UserRouter.get('/user/getall', (req, res, next) => {
	userService
		.getAll()
		.then((users) => res.json(users))
		.catch(next);
});

UserRouter.post('/signup', (req, res, next) => {
	// Verify that first name is not empty
	if (!req.body.firstName) {
		res.statusCode = 500;
		res.send({
			name: 'FirstNameError',
			message: 'The first name is required',
		});
	} else {
		User.register(
			new User({ username: req.body.username }),
			req.body.password,
			(err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName || '';
					const token = getToken({ _id: user._id });
					const refreshToken = getRefreshToken({ _id: user._id });
					user.refreshToken.push({ refreshToken });
					user.save((err, user) => {
						if (err) {
							res.statusCode = 500;
							res.send(err);
						} else {
							res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
							res.send({ success: true, token });
						}
					});
				}
			}
		);
	}
});

UserRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
	const token = getToken({ _id: req.user._id });
	const refreshToken = getRefreshToken({ _id: req.user._id });
	User.findById(req.user._id).then(
		(user) => {
			user.refreshToken.push({ refreshToken });
			user.save((err, user) => {
				if (err) {
					res.statusCode = 500;
					console.log(`Login Error: ${err}`);
					res.send(err);
				} else {
					res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
					console.log(`Logged in ${user.username}`);
					res.send({ success: true, token });
				}
			});
		},
		(err) => next(err)
	);
});

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
			User.findOne({ _id: userId }).then(
				(user) => {
					if (user) {
						// Find the refresh token against the user record in database
						const tokenIndex = user.refreshToken.findIndex(
							(item) => item.refreshToken === refreshToken
						);

						if (tokenIndex === -1) {
							res.statusCode = 401;
							res.send('Unauthorized');
						} else {
							const token = getToken({ _id: userId });
							// If the refresh token exists, then create new one and replace it.
							const newRefreshToken = getRefreshToken({ _id: userId });
							user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
							user.save((err, user) => {
								if (err) {
									res.statusCode = 500;
									res.send(err);
								} else {
									res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
									res.send({ success: true, token });
								}
							});
						}
					} else {
						res.statusCode = 401;
						res.send('Unauthorized');
					}
				},
				(err) => next(err)
			);
		} catch (err) {
			res.statusCode = 401;
			res.send('Unauthorized');
		}
	} else {
		res.statusCode = 401;
		res.send('Unauthorized');
	}
});

UserRouter.get('/me', verifyUser, (req, res, next) => {
	res.send(req.user);
});

UserRouter.get('/logout', verifyUser, (req, res, next) => {
	const { signedCookies = {} } = req;
	const { refreshToken } = signedCookies;
	User.findById(req.user._id).then(
		(user) => {
			const tokenIndex = user.refreshToken.findIndex(
				(item) => item.refreshToken === refreshToken
			);

			if (tokenIndex !== -1) {
				user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
			}

			user.save((err, user) => {
				if (err) {
					res.statusCode = 500;
					res.send(err);
				} else {
					res.clearCookie('refreshToken', COOKIE_OPTIONS);
					res.send({ success: true });
				}
			});
		},
		(err) => next(err)
	);
});

export default UserRouter;
