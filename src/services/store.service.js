import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addStoreResponseDTO } from "../dtos/store.dto.js";
import { addStore, getStore, getRegionToStoreId, getCategoryToStoreId } from "../models/store.dao.js";

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