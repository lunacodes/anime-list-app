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
const { getToken, COOKIE_OPTIONS, getRefreshToken } = '../authenticate.js';

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.route('/signup').post((req, res, next) => {
	// console.log('/users/signup works');
	console.log(req.body);
	// Verify that first name isn't empty
	if (!req.body.firstName) {
		console.log('firstName Error');
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
					console.log(err);
					res.statusCode = 500;
					res.send(err);
				} else {
					console.log('else');
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName || '';
					const token = getToken({ _id: user._id });
					const refreshToken = getRefreshToken({ _id: user._id });
					user.refreshToken.push({ refreshToken });
					user.save((err, user) => {
						if (err) {
							console.log('User Save Error');
							res.statusCode = 500;
							res.send(err);
						} else {
							console.log('User Save success?');
							res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
							res.send({ success: true, token });
						}
					});
				}
			}
		);
	}
});

// userRouter.post('/users/signup', (req, res, next) => {
// 	// Verify that first name isn't empty
// 	if (!req.body.firstName) {
// 		res.statusCode = 500;
// 		res.send({
// 			name: 'FirstNameError',
// 			message: 'The first name is required',
// 		});
// 	} else {
// 		User.register(
// 			new User({
// 				username: req.body.username,
// 			}),
// 			req.body.password,
// 			(err, user) => {
// 				if (err) {
// 					res.statusCode = 500;
// 					res.send(err);
// 				} else {
// 					user.firstName = req.body.firstName;
// 					user.lastName = req.body.lastName || '';
// 					const token = getToken({ _id: user._id });
// 					const refreshToken = getRefreshToken({ _id: user._id });
// 					user.refreshToken.push({ refreshToken });
// 					user.save((err, user) => {
// 						if (err) {
// 							res.statusCode = 500;
// 							res.send(err);
// 						} else {
// 							res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
// 							res.send({ success: true, token });
// 						}
// 					});
// 				}
// 			}
// 		);
// 	}
// });

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
	console.log(res);

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
