export const addStoreResponseDTO = (store, region, category) => {
    return {"name": store[0].name, "region": region[0][0].name, "category": category[0][0].name};
}

export const addStoreReviewResponseDTO = (store) => {
    return {"name": store[0].name, "rate": store[0].rate};
}

export const addStoreMissionResponseDTO = (store, mission) => {
    const storeMission = [];
    for (let i = 0; i < mission[0].length; i++) {
        storeMission.push(mission[0][i].title);
    }
    return {"name": store[0].name, "missionList": storeMission};
}

export const getStoreReviewResponseDTO = (storeReview, count) => {
    const reviews = [];

    for (let i = 0; i < storeReview.length; i++) {
        reviews.push({
            "nickname": storeReview[i].name,
            "create_date": formatDate(storeReview[i].created_at),
            "rate": storeReview[i].rate,
            "content": storeReview[i].contents
        });
    }
    return {"totalElements": count, "reviews": reviews};
}

export const getStoreMissionResponseDTO = (storeMission, count) => {
    const missions = [];

    for (let i = 0; i < storeMission.length; i++) {
        missions.push({
            "title": storeMission[i].title,
            "reward": storeMission[i].reward,
            "end_date": formatDate(storeMission[i].end_date)
        });
    }
    return {"totalElements": count, "missions": missions};
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞추기
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 맞추기
    return `${year}.${month}.${day}`;
}