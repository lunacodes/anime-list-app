import bcrypt from 'bcrypt';
import db from './db.js';
import Roles from './role.js';

export default async function createTestUser() {
	// create test user if db is empty
	if ((await db.User.countDocuments({})) === 0) {
		const user = new db.User({
			firstName: 'Test',
			lastName: 'User',
			username: 'test',
			passwordHash: bcrypt.hashSync('test', 10),
			role: Roles.Admin,
		});
		await user.save();
	}
}
