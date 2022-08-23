import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { model, Schema } = mongoose;

const Session = new Schema({
	refreshToken: {
		type: String,
		default: '',
	},
});

const UserSchema = new Schema(
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
	{ collection: 'users2' }
);

//Remove refreshToken from the response
UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.refreshToken;
		return ret;
	},
});

UserSchema.plugin(passportLocalMongoose);
export const User = model('User', UserSchema);
