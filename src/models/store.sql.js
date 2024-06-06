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