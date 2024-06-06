import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStoreMissionResponseDTO, addStoreResponseDTO, addStoreReviewResponseDTO } from "../dtos/store.dto.js";
import { addStore, getStore, getRegionToStoreId, getCategoryToStoreId, addStoreReview, addStoreMission, getMissionToStoreId } from "../models/store.dao.js";

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

export const createStoreMission = async (storeId, body) => {
    const endDate = new Date(body.end_date_year, body.end_date_month, body.end_date_day);
    const createStoreMissionData = await addStoreMission(storeId, {
        'title': body.title,
        'reward': body.reward,
        'end': endDate
    });

    if(createStoreMissionData == -1) {
        throw new BaseError(status.BAD_REQUEST);
    } else {
        return addStoreMissionResponseDTO(await getStore(storeId), await getMissionToStoreId(storeId));
    }
}