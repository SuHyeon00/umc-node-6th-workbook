export const signinResponseDTO = (user, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].lengh; i++) {
        preferFood.push(prefer[0][i].name);
    }
    return {"name": user[0].name, "preferCategory": preferFood};
}