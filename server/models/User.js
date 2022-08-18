import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { model, Schema, ObjectId } = mongoose;

const Session = new Schema({
	refreshToken: {
		type: String,
		default: '',
	},
});

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			default: '',
		},
		lastName: {
			type: String,
			default: '',
		},
		authStrategy: {
			type: String,
			default: 'local',
		},
		points: {
			type: Number,
			default: 50,
		},
		refreshToken: {
			type: [Session],
		},
	},
	// {
	// 	firstName: { type: String, default: '' },
	// 	lastName: { type: String, default: '' },
	// 	authStrategy: { type: String, default: 'local' },
	// 	refreshToken: { type: [Session] },
	// 	username: { type: String },
	// 	email: { type: String },
	// 	password: { type: String },
	// 	id: { type: ObjectId },
	// },
	{ collection: 'users2' }
);

//Remove refreshToken from the response
userSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.refreshToken;
		return ret;
	},
});

userSchema.plugin(passportLocalMongoose);
export const User = model('User', userSchema);
