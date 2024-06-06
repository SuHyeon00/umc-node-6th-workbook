import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreSql, getStoreById, getRegionByStoreId, getCategoryByStoreId, insertReviewSql, updateStoreRate } from "./store.sql.js";

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

        if(store.length == 0) {
            return -1;
        }

        console.log(`${storeId}의 가게 정보: ${store}`);

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
        const region = await pool.query(getRegionByStoreId, storeId);

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
        const category = await pool.query(getCategoryByStoreId, storeId);

        conn.release();

        return category;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// store에 해당하는 리뷰 정보 등록
export const addStoreReview = async (storeId, data) => {
    try {
        const conn = await pool.getConnection();

        const result = await conn.query(insertReviewSql, [storeId, 1, data.rate, data.content]);
        await conn.query(updateStoreRate, [storeId]);
        await conn.commit();

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        if (conn) {
            await conn.rollback();
            conn.release();
        }
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}