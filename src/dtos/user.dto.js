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

export const getUserReviewResponseDTO = (userReview, count) => {
    const reviews = [];

    for (let i = 0; i < userReview.length; i++) {
        reviews.push({
            "nickname": userReview[i].name,
            "create_date": formatDate(userReview[i].created_at),
            "rate": userReview[i].rate,
            "content": userReview[i].contents
        });
    }
    return {"totalElements": count, "reviews": reviews};
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
}
