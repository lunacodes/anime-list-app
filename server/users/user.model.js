import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const schema = new Schema({
	firstName: { type: String, unique: false, required: false },
	lastName: { type: String, unique: false, required: false },
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: false, required: false },
	passwordHash: { type: String, required: true },
	role: { type: String, required: false },
	// TODO: Specify Type of animes as array of objects
	animes: { type: Array, unique: false, required: false },
});

// Virtual props are convenience props available to the mongoose model
// that don't get persisted to MongoDB
schema.set('toJSON', {
	virtuals: true, // include the virtuals in the output JSON
	versionKey: false, // exlucde the Mongoose _v version key
	transform: function (doc, ret) {
		// remove these props when object is serialized (converted to JSON)
		delete ret._id;
		delete ret.passwordHash;
	},
});

const User = model('User', schema);
export default User;
