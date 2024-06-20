import express from 'express';
import asyncHandler from 'express-async-handler';
import { postUserMission, userMissionComplete, userMissionNotFinishedPreview, userReviewPreview, userSignin } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/missions', asyncHandler(postUserMission));

userRouter.get('/:userId/reviews', asyncHandler(userReviewPreview));
userRouter.get('/:userId/missions/continue', asyncHandler(userMissionNotFinishedPreview));

userRouter.patch('/:userId/missions/:missionId', asyncHandler(userMissionComplete));
