export const insertStoreSql = "INSERT INTO restaurant (category_id, region_id, name, address, status) VALUES (?, ?, ?, ?, ?);";

export const getStoreById = "SELECT * FROM restaurant WHERE id = ?";

export const getRegionToStoreId = 
"SELECT s.id as store_id, r.name as region_name "
+ "FROM store s JOIN region r ON s.region_id = r.id "
+ "WHERE s.id = ?;";

export const getCategoryToStoreId = 
"SELECT s.id as store_id, c.name as category "
+ "FROM store s JOIN category c ON s.category_id = c.id "
+ "WHERE s.id = ?;";