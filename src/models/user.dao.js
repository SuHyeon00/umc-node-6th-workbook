import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { connectFoodCategory, getUserByID, insertUserSql, getPreferToUserId, insertUserMissionSql, getUserMissionByUserId, confirmUserMission, getUserReviewByUserIdAtFirst, getUserReviewByUserId, getUserReviewCount, getUserMissionsByUserIdAtFirst, getUserMissionsByUserId, getUserMissionCount, completeUserMission } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertUserSql, [data.name, data.gender, data.birth, data.address, data.phone]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserByID, userId);

        if(user.length == 0) {
            return -1;
        }

        conn.release();
        return user;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = pool.getConnection();

        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        (await conn).release();

        return;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserId = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserId, userId);

        conn.release();

        return prefer;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 사용자 미션 정보 등록
export const addUserMission = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmUserMission, data.mission_id);

        if(confirm[0].isExistUserMission){
            conn.release();
            throw new BaseError(status.MISSION_ALREADY_EXIST)
        }

        const result = await pool.query(insertUserMissionSql, [1, data.mission_id, false]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 사용자 미션 정보 조회
export const getUserMission = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const mission = await pool.query(getUserMissionByUserId, userId);

        conn.release();

        return mission;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

// 사용자 리뷰 정보 조회
export const getUserReviews = async (userId, size, page) => {
    try {
        const conn = await pool.getConnection();

        const [user] = await pool.query(getUserByID, userId);

        if(user.length == 0) {
            throw new BaseError(status.MEMBER_NOT_FOUND);
        }

        size = parseInt(size);

        if(page == "undefined" || typeof page == "undefined" || page == null) {
            const [reviews] = await pool.query(getUserReviewByUserIdAtFirst, [userId, size]);
            conn.release();
            return reviews;
        } else {
            page = parseInt(page);
            const [reviews] = await pool.query(getUserReviewByUserId, [userId, size, (page-1)*size]);
            conn.release();
            return reviews;
        }
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

export const getUserReviewsCount = async (userId) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUserReviewCount, userId);
        conn.release();
        return result[0].count;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

export const getUserMissions = async (userId, isFinished, size, page) => {
    try {
        const conn = await pool.getConnection();

        const [user] = await pool.query(getUserByID, userId);

        if(user.length == 0) {
            throw new BaseError(status.MEMBER_NOT_FOUND);
        }

        size = parseInt(size);

        if(page == "undefined" || typeof page == "undefined" || page == null) {
            const [missions] = await pool.query(getUserMissionsByUserIdAtFirst, [userId, isFinished, size]);
            conn.release();
            return missions;
        } else {
            page = parseInt(page);
            const [missions] = await pool.query(getUserMissionsByUserId, [userId, isFinished, size, (page-1)*size]);
            conn.release();
            return missions;
        }
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

export const getUserMissionsCount = async (userId, isFinished) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(getUserMissionCount, [userId, isFinished]);
        conn.release();
        return result[0].count;
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}

export const updateUserMission = async (userId, missionId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmUserMission, missionId);

        if(!confirm[0].isExistUserMission){
            conn.release();
            throw new BaseError(status.MISSION_NOT_FOUND)
        }

        const [user] = await pool.query(getUserByID, userId);

        if(user.length == 0) {
            throw new BaseError(status.MEMBER_NOT_FOUND);
        }

        await pool.query(completeUserMission, [userId, missionId]);
        conn.release();
    } catch (err) {
        console.log(err);
        if(err instanceof BaseError) {
            throw err;
        } else {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
    }
}
