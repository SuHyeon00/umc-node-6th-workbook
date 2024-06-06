export const insertStoreSql = "INSERT INTO restaurant (category_id, region_id, name, address, status) VALUES (?, ?, ?, ?, ?);";

export const getStoreById = "SELECT * FROM restaurant WHERE id = ?";

export const getRegionByStoreId = 
"SELECT s.id, r.name "
+ "FROM restaurant s JOIN region r ON s.region_id = r.id "
+ "WHERE s.id = ?";

export const getCategoryByStoreId = 
"SELECT s.id, c.name "
+ "FROM restaurant s JOIN category c ON s.category_id = c.id "
+ "WHERE s.id = ?";

export const insertReviewSql = "INSERT INTO review (restaurant_id, user_id, rate, contents) VALUES (?, ?, ?, ?);";

export const updateStoreRate = `
UPDATE restaurant r
JOIN (
    SELECT restaurant_id, AVG(rate) AS avg_rate
    FROM review
    GROUP BY restaurant_id
) rev ON r.id = rev.restaurant_id
SET r.rate = rev.avg_rate
WHERE r.id = ?;
`;

export const insertMissionSql = "INSERT INTO mission (restaurant_id, title, reward, end_date) VALUES (?, ?, ?, ?);";

export const getMissionByStoreId = "SELECT * FROM mission where restaurant_id = ?";