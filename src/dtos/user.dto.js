export const signinResponseDTO = (user, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].name);
    }
    return {"name": user[0].name, "preferCategory": preferFood};
}

export const addUserMissionResponseDTO = (user, mission) => {
    const userMission = [];
    for (let i = 0; i < mission[0].length; i++) {
        userMission.push(mission[0][i].title);
    }
    return {"name": user[0].name, "missionList": userMission};
}