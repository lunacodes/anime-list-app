import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { model, Schema } = mongoose;
// const { model, Schema, ObjectId } = mongoose;

const Session = new Schema({
	refreshToken: {
		type: String,
		default: '',
	},
});

const UserSchema = new Schema(
	{
		firstName: { type: String, default: '' },
		lastName: { type: String, default: '' },
		authStrategy: { type: String, default: 'local' },
		refreshToken: { type: [Session] },
		username: { type: String },
		email: { type: String },
		password: { type: String },
		// id: { type: ObjectId },
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
