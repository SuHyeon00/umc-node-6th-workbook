export const insertUserSql = "INSERT INTO user (name, gender, birth, address, phone_number) VALUES (?, ?, ?, ?, ?);";

export const getUserByID = "SELECT * FROM user WHERE id = ?";

export const connectFoodCategory = "INSERT INTO favor_food (category_id, user_id) VALUES (?, ?);";

export const getPreferToUserId = 
"SELECT ufc.id, ufc.category_id, ufc.user_id, fcl.name "
+ "FROM favor_food ufc JOIN category fcl ON ufc.category_id = fcl.id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;";

export const insertUserMissionSql = "INSERT INTO user_mission (user_id, mission_id, is_finished) VALUES (?, ?, ?);";

export const confirmUserMission = "SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ?) as isExistUserMission";

export const getUserMissionByUserId = 
"SELECT m.* "
+ "FROM mission m "
+ "JOIN user_mission um ON m.id = um.mission_id "
+ "WHERE um.user_id = ?";

export const getUserReviewByUserId =
"SELECT u.name, u.id, r.id, r.rate, r.contents, r.created_at "
+ "FROM review r JOIN user u ON r.user_id = u.id "
+ "WHERE r.user_id = ? "
+ "ORDER BY r.id DESC LIMIT ? OFFSET ?;";

export const getUserReviewByUserIdAtFirst =
"SELECT u.name, u.id, r.id, r.rate, r.contents, r.created_at "
+ "FROM review r JOIN user u ON r.user_id = u.id "
+ "WHERE r.user_id = ? "
+ "ORDER BY r.id DESC LIMIT ?;";

export const getUserReviewCount = "SELECT COUNT(*) AS count FROM review WHERE user_id = ?;";

export const getUserMissionsByUserId =
"SELECT r.name, m.title, m.reward, m.end_date "
+ "FROM mission m JOIN user_mission um ON m.id = um.mission_id "
+ "JOIN restaurant r ON m.restaurant_id = r.id "
+ "WHERE um.user_id = ? and um.is_finished = ? "
+ "ORDER BY m.id DESC LIMIT ? OFFSET ?;";

export const getUserMissionsByUserIdAtFirst =
"SELECT r.name, m.title, m.reward, m.end_date "
+ "FROM mission m JOIN user_mission um ON m.id = um.mission_id "
+ "JOIN restaurant r ON m.restaurant_id = r.id "
+ "WHERE um.user_id = ? and um.is_finished = ? "
+ "ORDER BY m.id DESC LIMIT ?;";

export const getUserMissionCount = "SELECT COUNT(*) AS count FROM user_mission WHERE user_id = ? and is_finished = ?;";