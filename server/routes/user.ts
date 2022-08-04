import express from 'express';
import {
  addUser,
  deleteUserById,
  findUserById,
  loginUser,
  updateUserById,
} from '../controllers/user';

const userRouter = express.Router();

userRouter.use(express.json());

// Add a new user
userRouter.route('/register').post((req, res) => {
  const firstName: any = req.query.firstName;
  const lastName: any = req.query.lastName;
  const username: any = req.query.username;
  const email: any = req.query.email;

  addUser(res, firstName, lastName, username, email);
});

// Delete a user
userRouter.route('/user/delete/:id').delete((req, res) => {
  const id: any = req.params.id;

  deleteUserById(res, id);
});

// Find a single user by ID
userRouter.route('/user/:id').get((req, res) => {
  const id: any = req.params.id;
  console.log(res);

  findUserById(res, id);
});

// Login a user by ID
userRouter.route('/login:id').post((req, res) => {
  const id: any = req.params.id;

  loginUser(res, id);
});

// Update a user by ID
userRouter.route('/user/update/:id').post((req, res) => {
  const id: any = req.params.id;

  updateUserById(res, id);
});

// List All Users
// userRouter.route('/user').get((req, res) => {
//   listUsers(res);
// });

export default userRouter;
