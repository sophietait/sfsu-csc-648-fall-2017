var db = require('../helpers/db');

/*
 *	db module is used by models to facilitate database operations.
 */

// Get all listings
exports.getAllListings = function(cb) {
	var sql = "SELECT listing_id, address, city, state, pincode, price "
		sql += "FROM listing";
	db.runquery(sql, cb); // Send query string and callback function
}

// Get listings that are LIKE the user's search
exports.getListingsBySearch = function(q, cb) {
	var sql = "SELECT listing_id, address, city, state, pincode, price ";
		sql += "FROM listing ";
		sql += "WHERE LOWER(address) LIKE LOWER('%" + q + "%') OR ";
		sql += "LOWER(city) LIKE LOWER('%" + q + "%') OR ";
		sql += "LOWER(state) LIKE LOWER('%" + q + "%') OR ";
		sql += "pincode LIKE '%" + q + "%'";
	db.runquery(sql, cb); // Send query string and callback function
}

