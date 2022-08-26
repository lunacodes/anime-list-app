import mongoose from 'mongoose';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {
	getToken,
	COOKIE_OPTIONS,
	getRefreshToken,
	verifyUser,
} from '../authenticate.js';

const { connect } = mongoose;

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'users2';
const options = { dbName: dbName };

// Add User
export async function addUser(
	res,
	firstName,
	lastName,
	username,
	password,
	email
) {
	await connect(dbURI, options);
	const user = new User({
		firstName: firstName,
		lastName: lastName,
		username: username,
		password: password,
		email: email,
	});

	await user.save();
	console.log(`Registered user: ${username}`);
	res.json(user);
}

// Delete User
export async function deleteUserById(res, id) {
	await connect(dbURI, options);
	User.findByIdAndDelete(id, (err, user) => {
		if (err) {
			console.log(err);
		} else {
			res.json(user);
			console.log(`Deleted user: ${user}`);
		}
	});
}

// Find User
export async function findUserById(res, id) {
	await connect(dbURI, options);
	User.findById(id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Found user: \n${result}`);
			res.json(result);
		}
	});
}

// List All Users
export async function listUsers(res) {
	await connect(dbURI, options);
	User.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('displayed users');
			res.json(result);
		}
	});
}

// Login User
export async function loginUser(res, id, token, refreshToken, next) {
	console.log(id, token, refreshToken);

	User.findById(id).then(
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

	console.log(`Logged in user: ${id}`);
}

// Logout User
export async function logoutUser(res, id, refreshToken, next) {
	User.findById(id).then(
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
}

// Refresh User Token
export async function refreshUserToken(userId, refreshToken) {
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
}

export async function registerUser(req, res, next) {
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
						console.log(`Registered user: ${user}\nToken: ${refreshToken}`);
					}
				});
			}
		}
	);
}
// Update User
export async function updateUserById(res, id) {
	await connect(dbURI, options);

	const newValues = {
		title: res.query.title,
		score: res.query.score,
		progress: res.query.progress,
		tags: res.query.tags,
	};

	User.findByIdAndUpdate(id, newValues, (err, user) => {
		console.log(id);
		console.log(`new values: \n${newValues}`);

		if (err) {
			console.log(err);
		} else {
			res.json(user);
			console.log(`Updated user: ${user}`);
		}
	});
}
