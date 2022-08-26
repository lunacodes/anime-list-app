import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

export default function jwt() {
	const secret = process.env.JWT_SECRET || 'cat';

	return expressjwt({ secret, algorithms: ['HS256'] }).unless({
		path: [
			// public routes that don't require authentication
			'/users/authenticate',
		],
	});
}
