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

export const getUserMissionResponseDTO = (userMission, count) => {
    const missions = [];

    for (let i = 0; i < userMission.length; i++) {
        missions.push({
            "restaurant_name": userMission[i].name,
            "title": userMission[i].title,
            "reward": userMission[i].reward,
            "end_date": formatDate(userMission[i].end_date)
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
