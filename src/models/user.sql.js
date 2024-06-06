export const insertUserSql = "INSERT INTO user (name, gender, birth, address, phone_number) VALUES (?, ?, ?, ?, ?);";

export const getUserByID = "SELECT * FROM user WHERE id = ?";

export const connectFoodCategory = "INSERT INTO favor_food (category_id, user_id) VALUES (?, ?);";

export const getPreferToUserId = 
"SELECT ufc.id, ufc.category_id, ufc.user_id, fcl.name "
+ "FROM favor_food ufc JOIN category fcl ON ufc.category_id = fcl.id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;";