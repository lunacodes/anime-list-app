import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../_helpers/db.js';
import Roles from '../_helpers/role.js';

const secret = process.env.JWT_SECRET;

async function authenticate({ username, password, ipAddress }) {
	const user = await db.User.findOne({ username });

	if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
		throw 'Username or password is incorrect';
	}

	// authentication successful so generate jwt and refresh tokens
	const jwtToken = generateJwtToken(user);
	const refreshToken = generateRefreshToken(user, ipAddress);

	// save refresh token
	await refreshToken.save();

	// return basic details and tokens
	return {
		...basicDetails(user),
		jwtToken,
		refreshToken: refreshToken.token,
	};
}

async function refreshToken({ token, ipAddress }) {
	const refreshToken = await getRefreshToken(token);
	const { user } = refreshToken;

	// replace old refresh token with a new one and save
	const newRefreshToken = generateRefreshToken(user, ipAddress);
	refreshToken.revoked = Date.now();
	refreshToken.revokedByIp = ipAddress;
	refreshToken.replacedByToken = newRefreshToken.token;
	await refreshToken.save();
	await newRefreshToken.save();

	// generate new jwt
	const jwtToken = generateJwtToken(user);

	// return basic details and tokens
	return {
		...basicDetails(user),
		jwtToken,
		refreshToken: newRefreshToken.token,
	};
}

async function revokeToken({ token, ipAddress }) {
	const refreshToken = await getRefreshToken(token);

	// revoke token and save
	refreshToken.revoked = Date.now();
	refreshToken.revokedByIp = ipAddress;
	await refreshToken.save();
}

async function getAllUsers() {
	const users = await db.User.find();
	return users.map((x) => basicDetails(x));
}

async function getById(id) {
	const user = await getUser(id);
	return basicDetails(user);
}

async function getRefreshTokens(userId) {
	// check that user exists
	await getUser(userId);

	// return refresh tokens for user
	const refreshTokens = await db.RefreshToken.find({ user: userId });
	return refreshTokens;
}

async function addAnimeToUser(res, user, animeToAdd) {
	const titles = user.animes.map((anime) => {
		return anime.title;
	});

	if (titles.includes(animeToAdd.title)) {
		console.error("Anime is already in user's library");
		return res.send("Anime is already in user's library");
	} else {
		user.animes.push(animeToAdd);
		user.animes.sort();

		await user.save((err, user) => {
			if (err) {
				console.error(`Error 1: \n${err}`);
				return res.send(`Error: \n${err}`);
			}
			console.log('Add - user.save ran:', user);
			res.json(user);
			return user;
		});
	}
}

async function removeAnimeFromUser(res, user, animeToRemove) {
	let userAnimes = user.animes;

	console.log(animeToRemove);
	console.log(userAnimes);
	if (!userAnimes.includes(animeToRemove)) {
		console.error("Anime not in user's library");
		return res.send("Anime not in user's library");
	} else {
		userAnimes = userAnimes
			.filter((val) => {
				return val !== animeToRemove;
			})
			.sort();

		user.animes = userAnimes;
		await user.save((err, user) => {
			if (err) {
				console.log(`Error 1: \n${err}`);
				return res.send(`Error: \n${err}`);
			}
			console.log('delete - user.save ran:', user);
			res.json(user);
			return user;
		});
	}
}

async function updateUserAnimes(res, id, newValues, action = '', next) {
	console.log('updateUserAnimes ran');
	const user = await getUser(id)
		.then((user, err) => {
			if (err) {
				console.error(`Error 1: ${err}`);
				return err;
			}

			switch (action) {
				case 'add':
					addAnimeToUser(res, user, newValues.anime);
					break;
				case 'remove':
					removeAnimeFromUser(res, user, newValues.anime);
					break;
				default:
					db.User.findByIdAndUpdate(id, newValues, (err, user) => {
						if (err) {
							console.error(`Error 2: ${err}`);
							return err;
						} else {
							console.log(`Updated user: ${user}`);
							return user;
						}
					});

					break;
			}
		})
		.catch(next);

	return user;
}

async function registerUser({ firstName, lastName, username, password }, res) {
	const user = new db.User({
		firstName: firstName,
		lastName: lastName,
		username: username,
		passwordHash: bcrypt.hashSync(`${password}`, 10),
		animes: [],
		role: Roles.User,
	});
	await user.save((err, user) => {
		if (err) {
			return res.send(`Error: \n${err}`);
		}
		res.json(user);
	});
}

// helper functions
async function getUser(id) {
	if (!db.isValidId(id)) throw 'User not found';
	const user = await db.User.findById(id);
	if (!user) throw 'User not found';
	return user;
}

async function getRefreshToken(token) {
	const refreshToken = await db.RefreshToken.findOne({ token }).populate(
		'user'
	);
	if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
	return refreshToken;
}

function generateJwtToken(user) {
	// create a jwt token containing the user id that expires in 15 minutes
	return jwt.sign({ sub: user.id, id: user.id }, secret, {
		expiresIn: '15m',
	});
}

function generateRefreshToken(user, ipAddress) {
	// create a refresh token that expires in 7 days
	return new db.RefreshToken({
		user: user.id,
		token: randomTokenString(),
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		createdByIp: ipAddress,
	});
}

function randomTokenString() {
	return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
	const { id, firstName, lastName, username, role, animes } = user;
	return { id, firstName, lastName, username, role, animes };
}

const userService = {
	authenticate,
	registerUser,
	refreshToken,
	revokeToken,
	getAllUsers,
	getById,
	getRefreshTokens,
	updateUserAnimes,
};

export default userService;
