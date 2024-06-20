import { getUserMissionResponseDTO, getUserReviewResponseDTO } from "../dtos/user.dto.js";
import { getUserMissions, getUserMissionsCount, getUserReviews, getUserReviewsCount } from "../models/user.dao.js";

export const getUserReview = async (userId, query) => {
    const {page, size = 3} = query;
    return getUserReviewResponseDTO(await getUserReviews(userId, size, page), await getUserReviewsCount(userId));
}

export const getUserMissionNotFinished = async (userId, query) => {
    const {page, size = 3} = query;
    return getUserMissionResponseDTO(await getUserMissions(userId, 0, size, page), await getUserMissionsCount(userId, 0));
}