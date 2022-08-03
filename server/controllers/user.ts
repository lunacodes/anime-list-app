import { connect, Types } from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();
const dbURI = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME || 'webtoons';
const options = { dbName: dbName };

// Add User
export async function addUser(
  res: any,
  firstName: string,
  lastName: string,
  username: string,
  email: string
) {
  await connect(dbURI, options);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
  });

  await user.save();
  console.log(`Registered user: ${username}`);
  res.json(user);
}

// Delete User
export async function deleteUserById(res: any, id: string) {
  await connect(dbURI, options);
  User.findByIdAndDelete(id, (err: any, user: any) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
      console.log(`Deleted user: ${user}`);
    }
  });
}

// Find User
export async function findUserById(res: any, id: string) {
  await connect(dbURI, options);
  User.findById(id, (err: any, result: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Found user: \n${result}`);
      res.json(result);
    }
  });
}

// Login User
export async function loginUser(res: any, id: string) {
  // This will be replaced with middleware,
  // and possibly moved to its own controller
  await connect(dbURI, options);
  console.log(`Logged in user: ${id}`);
}

// Update User
export async function updateUserById(res: any, id: string) {
  await connect(dbURI, options);

  const newValues = {
    title: res.query.title,
    score: res.query.score,
    progress: res.query.progress,
    tags: res.query.tags,
  };

  User.findByIdAndUpdate(id, newValues, (err: any, user: any) => {
    console.log(id);
    console.log(`new values: \n${newValues}`);

    if (err) {
      console.log(err);
    } else {
      res.json(user);
      console.log(`Updated user: ${user}`);
    }
  });
}
