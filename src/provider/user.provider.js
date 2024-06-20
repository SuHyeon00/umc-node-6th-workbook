import { getUserReviewResponseDTO } from "../dtos/user.dto.js";
import { getUserReviews, getUserReviewsCount } from "../models/user.dao.js";

export const getUserReview = async (userId, query) => {
    const {page, size = 3} = query;
    return getUserReviewResponseDTO(await getUserReviews(userId, size, page), await getUserReviewsCount(userId));
}