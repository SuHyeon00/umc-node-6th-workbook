import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { createStore, createStoreMission, createStoreReview } from "../services/store.service.js";

export const storeCreate = async (req, res, next) => {
    console.log("가게 생성 요청");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await createStore(req.body)));
};

export const storeReviewCreate = async (req, res, next) => {
    console.log("가게 리뷰 생성 요청");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await createStoreReview(parseInt(req.params.storeId), req.body)));
};

export const storeMissionCreate = async (req, res, next) => {
    console.log("가게 미션 생성 요청");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await createStoreMission(parseInt(req.params.storeId), req.body)));
};