import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStoreResponseDTO, addStoreReviewResponseDTO } from "../dtos/store.dto.js";
import { addStore, getStore, getRegionToStoreId, getCategoryToStoreId, addStoreReview } from "../models/store.dao.js";

export const createStore = async (body) => {
    const createStoreData = await addStore({
        'category': body.category,
        'region': body.region,
        'name': body.name,
        'address': body.address,
        'status': body.status  
    });

    if(createStoreData == -1) {
        throw new BaseError(status.BAD_REQUEST);
    } else {
        return addStoreResponseDTO(await getStore(createStoreData), await getRegionToStoreId(createStoreData), await getCategoryToStoreId(createStoreData))
    }
}

export const createStoreReview = async (storeId, body) => {
    // 가게 정보 존재하는지 확인
    const result = await getStore(storeId);

    if(result == -1) {
        throw new BaseError(status.STORE_NOT_FOUND);
    }

    const createStoreReviewData = await addStoreReview(storeId, {
        'rate': body.rate,
        'content': body.content
    });

    if(createStoreReviewData == -1) {
        throw new BaseError(status.BAD_REQUEST);
    } else {
        return addStoreReviewResponseDTO(await getStore(storeId))
    }
}