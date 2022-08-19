import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './utilities/connectdb.js'; // User for auth apparently
import './strategies/JwtStrategy.js';
import './strategies/LocalStrategy.js';
// import { getToken, COOKIE_OPTIONS, getRefreshToken } from './authenticate.js';
import 'connect';
import session from 'express-session';

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
// const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';

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

login.use(cors(loginCorsOptions));
login.use(express.json());
login.use(cookieParser(process.env.COOKIE_SECRET));
login.use(bodyParser.json());
login.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
	})
); // session secret
login.use(passport.initialize());
login.use(passport.session());
login.use(novelRouter);
login.use(userRouter);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
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
