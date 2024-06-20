import express from 'express';
import asyncHandler from 'express-async-handler';
import { storeCreate, storeMissionCreate, storeReviewCreate, storeReviewPreview } from '../controllers/store.controller.js';

export const storeRouter = express.Router();

storeRouter.post('', asyncHandler(storeCreate));
storeRouter.post('/:storeId/reviews', asyncHandler(storeReviewCreate));
storeRouter.post('/:storeId/missions', asyncHandler(storeMissionCreate));

storeRouter.get('/:storeId/reviews', asyncHandler(storeReviewPreview));