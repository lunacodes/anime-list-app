// import dbHandler from './db-handler.js';
import mongoose from 'mongoose';
import User from '../users/user.model.js';
import bcrypt from 'bcrypt';
// import registerUser from '../users/user.controller.js';
// import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, dropDB, dropCollections } from './db-handler.js';

beforeAll(async () => {
	await connectDB();
});

afterAll(async () => {
	await dropDB();
});

afterEach(async () => {
	await dropCollections();
});

describe('User Model', () => {
	it('should create a user item successfully', async () => {
		let password = 'lunacodes2';
		let validUser = {
			firstName: 'Luna',
			lastName: 'Luna2',
			username: 'lunacodes2',
			passwordHash: bcrypt.hashSync(`${password}`, 10),
		};

		const newUser = await User(validUser);
		await newUser.save();
		expect(newUser._id).toBeDefined();
		expect(newUser.firstName).toBe(validUser.firstName);
		expect(newUser.lastName).toBe(validUser.lastName);
		expect(newUser.username).toBe(validUser.username);
		expect(newUser.passwordHash).toBe(validUser.passwordHash);
	});
});
