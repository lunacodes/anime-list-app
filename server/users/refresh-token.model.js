import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const schema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	token: String,
	expires: Date,
	created: { type: Date, default: Date.now },
	createdByIp: String,
	revoked: Date,
	revokedByIp: String,
	replacedByToken: String,
});

schema.virtual('isExpired').get(function () {
	return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
	return !this.revoked && !this.isExpired;
});

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
		delete ret.id;
		delete ret.user;
	},
});

const RefreshToken = model('RefreshToken', schema);

export default RefreshToken;
