import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IWebtoon {
  title: String;
  score: String;
  progress: String;
  tags: String;
}

// 2. Create a Schema corresponding to the document interface.
const webtoonSchema = new Schema<IWebtoon>({
  title: { type: String, required: true },
  score: { type: String, required: true },
  progress: { type: String, required: true },
  tags: { type: String, required: true },
});

// 3. Create a Model.
export const Webtoon = model<IWebtoon>('Webtoon', webtoonSchema);

// run().catch((err) => console.log(err));
//
// async function run() {
//   // 4. Connect to MongoDB
//   await connect(
//     'mongodb+srv://lunacodes:R5bLNROGwdSUokjh@cluster0.t1qwo.mongodb.net/Cluster0?retryWrites=true&w=majority',
//     { dbName: 'sample' }
//   );
//
//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png',
//   });
//   await user.save();
//
//   console.log(user.email); // 'bill@initech.com'
// }

// import { model, Schema, Model, Document } from 'mongoose';
//
// interface IWebtoon extends Document {
// 	title: String;
// 	score: String;
// 	progress: String;
// 	tags: String;
// }
//
// const WebtoonSchema: Schema = new Schema({
// 	title: { type: String, required: true },
// 	score: { type: String, required: true },
// 	progress: { type: String, required: true },
// 	tags: { type: String, required: true },
// });
//
// const Webtoon: Model<IWebtoon> = model('Webtoon', WebtoonSchema);
