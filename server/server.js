import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './utilities/connectdb.js';
import './strategies/JwtStrategy.js';
import './strategies/LocalStrategy.js';
import 'connect';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Routes
import novelRouter from './routes/novel.js';
import userRouter from './routes/user.js';

// Environment Variables
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const LOGIN_PORT = process.env.LOGIN_PORT || 8081;

const login = express();
const app = express();

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(',')
	: ['*'];
const loginCorsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},

	credentials: true,
};

const corsOptions = {
	origin: '*',
};

login.use(cookieParser(process.env.COOKIE_SECRET));
login.use(bodyParser.json());
login.use(cors(loginCorsOptions));
// login.use(cors({ origin: 'http://localhost:3000', credentials: true }));
login.use(cors({ origin: 'https://my-light-novels.com', credentials: true }));
login.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.ATLAS_URI,
			dbName: 'users',
		}),
	})
); // session secret
login.use(passport.initialize());
login.use(passport.session());
login.use(userRouter);
login.get('/', function (req, res) {
	res.send({ status: 'success' });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
login.use(bodyParser.json());
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.ATLAS_URI,
			dbName: 'users',
		}),
	})
); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(novelRouter);
app.use(userRouter);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

login.listen(LOGIN_PORT, () => {
	console.log(`Server listening on ${LOGIN_PORT}`);
});
