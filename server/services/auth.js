import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './utilities/connectdb.js';
import './strategies/JwtStrategy.js';
import './strategies/LocalStrategy.js';
import 'connect';
import session from 'express-session';

// Routes
import userRouter from './routes/user.js';

// Environment Variables
dotenv.config();
const LOGIN_PORT = process.env.LOGIN_PORT || 8081;

const login = express();

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

login.use(cookieParser(process.env.COOKIE_SECRET));
login.use(bodyParser.json());
login.use(cors(loginCorsOptions));
login.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
	})
); // session secret
login.use(passport.initialize());
login.use(passport.session());

export const AuthService = () =>
	login.listen(LOGIN_PORT, () => {
		console.log(`Server listening on ${LOGIN_PORT}`);
	});
