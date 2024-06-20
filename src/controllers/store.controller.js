import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { createStore, createStoreMission, createStoreReview } from "../services/store.service.js";
import { getStoreReview } from "../provider/store.provider.js";

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

export const storeReviewPreview = async (req, res, next) => {
    console.log("가게 리뷰 미리보기 요청");
    console.log("params: ", req.params);

    res.send(response(status.SUCCESS, await getStoreReview(parseInt(req.params.storeId), req.query)));
}