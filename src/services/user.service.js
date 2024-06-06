import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addUserMissionResponseDTO, signinResponseDTO } from "../dtos/user.dto.js";
import { addUser, getUser, setPrefer, getUserPreferToUserId, addUserMission, getUserMission } from "../models/user.dao.js";

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const joinUserData = await addUser({
        'name': body.name,
        'gender': body.gender,
        'birth': birth,
        'address': body.addr,
        'phone': body.phone
    });

    if(joinUserData == -1) {
        throw new BaseError(status.BAD_REQUEST);
    } else {
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserId(joinUserData));
    }
};

export const createUserMission = async (body) => {
    const createUserMissionData = await addUserMission({
        'mission_id': body.mission_id
    });

    if(createUserMissionData == -1) {
        throw new BaseError(status.BAD_REQUEST);
    } else {
        return addUserMissionResponseDTO(await getUser(1), await getUserMission(1));
    }
}