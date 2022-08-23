import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_DB_CONNECTION_STRING;
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connect
	.then((db) => {
		console.log(`connected to db`);
	})
	.catch((err) => {
		console.log(err);
	});
