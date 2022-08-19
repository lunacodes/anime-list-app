import express from 'express';
import {
	addUser,
	deleteUserById,
	findUserById,
	listUsers,
	loginUser,
	updateUserById,
} from '../controllers/user.js';
import passport from 'passport';
import { User } from '../models/User.js';
import {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
	verifyUser,
} from '../authenticate.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/me', verifyUser, (req, res, next) => {
	res.send(req.user);
});

userRouter.get(['/logout', '../logout'], verifyUser, (req, res, next) => {
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

			user.save((err, usr) => {
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

userRouter.route('/signup').post((req, res, next) => {
	// Verify that first name isn't empty
	if (!req.body.firstName) {
		res.statusCode = 500;
		res.send({
			name: 'FirstNameError',
			message: 'The first name is required',
		});
	} else {
		User.register(
			new User({
				username: req.body.username,
			}),
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

userRouter.post(
	'/users/login',
	passport.authenticate('local'),
	(req, res, next) => {
		console.log(`Login Req 1: ${req}`);
		const token = getToken({ _id: req.user._id });
		const refreshToken = getRefreshToken({ _id: req.user._id });
		User.findById(req.user._id).then(
			(user) => {
				console.log(`User pass 1: ${user}`);
				user.refreshToken.push({ refreshToken });
				user.save((err, usr) => {
					console.log(`User pre-err check: ${usr}`);
					if (err) {
						console.log(`Error 1: ${err}`);
						res.statusCode = 500;
						res.send(err);
					} else {
						console.log(`Logged in user: ${usr}`);
						res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
						res.send({ success: true, token });
					}
				});
			},
			(err) => next(err)
		);
	}
);

userRouter.post('/refreshToken', (req, res, next) => {
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
							user.save((err, usr) => {
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

// Add a new user
userRouter.route('/register').post((req, res) => {
	const firstName = req.query.firstName;
	const lastName = req.query.lastName;
	const username = req.query.username;
	const password = req.query.password;
	const email = req.query.email;

	addUser(res, firstName, lastName, username, password, email);
});

// Delete a user
userRouter.route('/user/delete/:id').delete((req, res) => {
	const id = req.params.id;

	deleteUserById(res, id);
});

// Find a single user by ID
userRouter.route('/user/:id').get((req, res) => {
	const id = req.params.id;

	findUserById(res, id);
});

// List All Users
userRouter.route('/listuser').get((req, res) => {
	listUsers(res);
});

// Login a user by ID
userRouter.route('/login:id').post((req, res) => {
	const id = req.params.id;

	loginUser(res, id);
});

// Update a user by ID
userRouter.route('/user/update/:id').post((req, res) => {
	const id = req.params.id;

	updateUserById(res, id);
});

export default userRouter;
