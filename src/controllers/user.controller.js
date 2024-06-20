import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { joinUser, createUserMission } from "../services/user.service.js";
import { getUserReview } from "../provider/user.provider.js";

export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await joinUser(req.body)));
};

export const postUserMission = async (req, res, next) => {
    console.log("유저가 미션을 도전하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await createUserMission(req.body)));
}

export const userReviewPreview = async (req, res, next) => {
    console.log("유저의 리뷰를 조회합니다!");
    console.log("params: ", req.params);

    res.send(response(status.SUCCESS, await getUserReview(parseInt(req.params.userId), req.query)));
}