import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './utilities/connectdb.js';
import './strategies/JwtStrategy.js';
import './strategies/LocalStrategy.js';
import './authenticate.js';

// Routes
import novelRouter from './routes/novel.js';
import UserRouter from './routes/user.js';

// Environment Variables
dotenv.config();
const PORT = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(',')
	: [];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},

	credentials: true,
};

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use('/users', UserRouter);
app.use('/novels', novelRouter);

app.get('/', function (req, res) {
	res.send({ status: 'success' });
});

const server = app.listen(PORT, function () {
	const port = server.address().port;

	console.log('App started at port:', port);
});
