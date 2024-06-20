import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreSql, getStoreById, getRegionByStoreId, getCategoryByStoreId, insertReviewSql, updateStoreRate, insertMissionSql, getMissionByStoreId, getStoreReviewByReviewIdAtFirst, getStoreReviewByReviewId, getStoreReviewCount, getStoreMissionCount } from "./store.sql.js";

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

        // 가게 정보 존재하는지 확인
        const [confirm] = await getStore(storeId);

        if(confirm == -1) {
            throw new BaseError(status.STORE_NOT_FOUND);
        }

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

// store에 해당하는 미션 정보 등록
export const addStoreMission = async (storeId, data) => {
    try {
        const conn = await pool.getConnection();

        // 가게 정보 존재하는지 확인
        const [confirm] = await getStore(storeId);

        if(confirm == -1) {
            throw new BaseError(status.STORE_NOT_FOUND);
        }

        const result = await pool.query(insertMissionSql, [storeId, data.title, data.reward, data.end]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// store에 해당하는 미션 정보 조회
export const getMissionToStoreId = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const mission = await pool.query(getMissionByStoreId, storeId);

        conn.release();

        return mission;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStoreReviews = async (storeId, cursorId, size) => {
    try {
        const conn = await pool.getConnection();

        // 가게 정보 존재하는지 확인
        const [confirm] = await getStore(storeId);

        if(confirm == -1) {
            throw new BaseError(status.STORE_NOT_FOUND);
        }

        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null) {
            const [reviews] = await pool.query(getStoreReviewByReviewIdAtFirst, [storeId, parseInt(size)]);
            conn.release();
            return reviews;
        } else {
            const [reviews] = await pool.query(getStoreReviewByReviewId, [storeId, parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;
        }
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStoreReviewsCount = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const [count] = await pool.query(getStoreReviewCount, storeId);

        conn.release();
        return count[0].count;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStoreMissions = async (storeId, page, size) => {
    try {
        const conn = await pool.getConnection();
        size = parseInt(size);

        if(page == null || page == "undefined" || typeof page == "undefined") {
            const [missions] = await pool.query(getStoreMissionByMissionIdAtFirst, [storeId, size]);
            conn.release();
            return missions;
        } else {
            page = parseInt(page);
            const [missions] = await pool.query(getStoreMissionByMissionId, [storeId, size, (page - 1) * size]);
            conn.release();
            return missions;
        }
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStoreMissionsCount = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const [count] = await pool.query(getStoreMissionCount, storeId);

        conn.release();
        return count[0].count;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
