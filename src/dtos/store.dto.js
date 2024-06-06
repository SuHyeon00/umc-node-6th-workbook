export const addStoreResponseDTO = (store, region, category) => {
    return {"name": store[0].name, "region": region[0][0].name, "category": category[0][0].name};
}

export const addStoreReviewResponseDTO = (store) => {
    console.log(store);
    return {"name": store[0].name, "rate": store[0].rate};
}