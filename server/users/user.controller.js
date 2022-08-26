import express from 'express';
const router = express.Router();
import userService from './user.service.js';

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

function authenticate(req, res, next) {
	userService
		.authenticate(req.body)
		.then((user) => res.json(user))
		.catch(next);
}

function getAll(req, res, next) {
	userService
		.getAll()
		.then((users) => res.json(users))
		.catch(next);
}

export default { authenticate, getAll };
