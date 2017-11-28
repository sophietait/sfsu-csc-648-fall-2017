/*
 *	db module is used by models to facilitate database operations.
 */
var db = require('../helpers/db');

/*
 * getUserByLogin
 * Get user that match the provided login credentials. 
 * q is an object that contains email and password
 */
exports.getUserByLogin = function(q, cb) {
	var sql = "SELECT user_id, email, first_name, last_name, user_type, phone ";
		sql += "FROM user ";
		sql += "WHERE ";
		sql += "email = ? AND ";
		sql += "user_password = ?";
	db.runqueryEscaped(sql, [q.email, q.password], cb); // Send query string and callback function
}

/*
 * getUsersByEmail
 * Get users that match the provided email
 * q is the user's email
 */
exports.getUsersByEmail = function(q, cb) {
	var sql = "SELECT user_id, email, first_name, last_name, user_type ";
		sql += "FROM user ";
		sql += "WHERE ";
		sql += "email = ?";
	db.runqueryEscaped(sql, [q], cb); // Send query string and callback function
}

/*
 * getUsersById
 * Get users that match the provided user id.
 */
exports.getUserById = function(id, cb) {
	var sql = "SELECT user_id, email, first_name, last_name, user_type ";
		sql += "FROM user ";
		sql += "WHERE ";
		sql += "user_id = ?";
	db.runqueryEscaped(sql, [id], cb); // Send query string and callback function
}

/*
 * addNewUser
 * q is an object that contains email and password
 */
exports.addNewUser = function(q, cb) {
	var sql = "INSERT INTO user(user_type, first_name, last_name, email, user_password, phone, i_agree) ";
		sql += "VALUES(?, ?, ?, ?, ?, 0, 1)";
	db.runqueryEscaped(sql, [q.type, q.first_name, q.last_name, q.email, q.password], cb);
}

exports.addListing = function(listingParams, userID, cb) {
	var sql = "INSERT INTO listing(address, state, city, zipcode, price, posted_on, bedroom_count, bathroom_count, pool, ac, heater, floor_size, parking, seller_id, image, thumbnail) ";
		sql += "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	db.runqueryEscaped(sql, [listingParams.address, listingParams.state, listingParams.city, listingParams.zipcode, listingParams.price, (new Date()).toISOString().substring(0, 10),listingParams.bedroom, listingParams.bathroom, listingParams.pool, listingParams.ac, listingParams.heater, listingParams.floor, listingParams.parking, userID, listingParams.image, listingParams.thumbnail], cb);
}

exports.deleteListing = function(listingId, cb) {
	var sql = "DELETE FROM listing ";
		sql += "WHERE listing_id = ?";
	db.runqueryEscaped(sql, [listingId], cb);
}

/*
 * getSellerListings
 * user is a user object
 * Used to get the listings that a given seller has posted
 * Uses image thumbnail
 */
exports.getSellerListings = function(user, cb){
	var sql = "SELECT thumbnail, listing_id, address FROM listing ";
		sql += "WHERE listing.seller_id = ?";
		db.runqueryEscaped(sql,	[user.id], cb);
}

/*
 * getContacts
 * Get the contacts involving the user with the specified id
 */
exports.getContacts = function(user, cb) {
	// to be implemented
}


