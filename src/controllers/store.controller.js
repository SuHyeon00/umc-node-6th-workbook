import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { createStore } from "../services/store.service.js";

export const storeCreate = async (req, res, next) => {
    console.log("가게 생성 요청");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await createStore(req.body)));
};