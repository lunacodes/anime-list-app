import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import path from 'path';

// const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({
	// path: path.resolve(__dirname, '../../.env'),
});

const url =
	'mongodb+srv://lunacodes:R5bLNROGwdSUokjh@cluster0.t1qwo.mongodb.net/Cluster0?';
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connect
	.then((db) => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});
