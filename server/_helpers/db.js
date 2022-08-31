import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from '../users/user.model.js';
import RefreshToken from '../users/refresh-token.model.js';
dotenv.config();

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'test',
};
const dbUri = `${process.env.MONGO_DB_CONNECTION_STRING}`;
mongoose.connect(dbUri || '', options);
mongoose.Promise = global.Promise;

function isValidId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

const db = {
	User: UserModel,
	RefreshToken: RefreshToken,
	isValidId,
};

export default db;
