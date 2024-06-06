import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { connectFoodCategory, getUserByID, insertUserSql, getPreferToUserId, insertUserMissionSql, getUserMissionByUserId, confirmUserMission } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertUserSql, [data.name, data.gender, data.birth, data.address, data.phone]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
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
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}