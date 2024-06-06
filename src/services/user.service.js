import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO } from "../dtos/user.dto.js";
import { addUser, getUser, setPrefer, getUserPreferToUserId } from "../models/user.dao.js";

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