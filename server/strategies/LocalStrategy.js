import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models/User.js';

//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()));

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
