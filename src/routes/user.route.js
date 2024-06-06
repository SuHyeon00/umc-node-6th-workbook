import express from 'express';
import asyncHandler from 'express-async-handler';
import { postUserMission, userSignin } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/missions', asyncHandler(postUserMission));