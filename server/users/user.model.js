import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	role: { type: String, required: true },
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
