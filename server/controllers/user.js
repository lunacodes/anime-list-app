import mongoose from 'mongoose';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
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
export async function loginUser(res, id) {
	console.log(res, id);
	// This will be replaced with middleware,
	// and possibly moved to its own controller
	await connect(dbURI, options);
	console.log(`Logged in user: ${id}`);
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
