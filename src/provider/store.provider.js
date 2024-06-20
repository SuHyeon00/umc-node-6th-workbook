import { getStoreMissionResponseDTO, getStoreReviewResponseDTO } from "../dtos/store.dto.js";
import { getStoreMissions, getStoreMissionsCount, getStoreReviews, getStoreReviewsCount } from "../models/store.dao.js";

export const getStoreReview = async (storeId, query) => {
    const {reviewId, size = 3} = query;
    return getStoreReviewResponseDTO(await getStoreReviews(storeId, reviewId, size), await getStoreReviewsCount(storeId));
}

export const getStoreMission = async (storeId, query) => {
    const {page, size = 3} = query;
    return getStoreMissionResponseDTO(await getStoreMissions(storeId, page, size ), await getStoreMissionsCount(storeId));
}