export const addStoreResponseDTO = (store, region, category) => {
    return {"name": store[0].name, "region": region[0].name, "category": category[0].name};
}