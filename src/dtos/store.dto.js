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