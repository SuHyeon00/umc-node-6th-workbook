import { getStoreReviewResponseDTO } from "../dtos/store.dto.js";
import { getStoreReviews, getStoreReviewsCount } from "../models/store.dao.js";

export const getStoreReview = async (storeId, query) => {
    const {reviewId, size = 3} = query;
    return getStoreReviewResponseDTO(await getStoreReviews(storeId, reviewId, size), await getStoreReviewsCount(storeId));
}