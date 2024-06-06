import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreSql, getStoreById } from "./store.sql.js";

// Store 데이터 삽입
export const addStore = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertStoreSql, [data.category, data.region, data.name, data.address, data.status]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// Store 데이터 조회
export const getStore = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const [store] = await pool.query(getStoreById, storeId);

        console.log(store);

        if(store.length == 0) {
            return -1;
        }

        conn.release();
        return store;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// store에 해당하는 지역 정보 조회
export const getRegionToStoreId = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const region = await pool.query(getRegionToStoreId, storeId);

        conn.release();

        return region;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// store에 해당하는 카테고리 정보 조회
export const getCategoryToStoreId = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const category = await pool.query(getCategoryToStoreId, storeId);

        conn.release();

        return category;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}