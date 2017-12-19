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
 * q is an object that contains user signup information
 */
exports.addNewUser = function(q, cb) {
	var sql = "INSERT INTO user(user_type, first_name, last_name, email, user_password, phone, i_agree) ";
		sql += "VALUES(?, ?, ?, ?, ?, ?, 1)";
	db.runqueryEscaped(sql, [q.type, q.first_name, q.last_name, q.email, q.password, q.phone], cb);
}

exports.addListing = function(listingParams, userID, cb) {
	var sql = "INSERT INTO listing(address, state, city, zipcode, price, posted_on, bedroom_count, bathroom_count, pool, ac, heater, floor_size, parking, seller_id, image, thumbnail) ";
		sql += "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	db.runqueryEscaped(sql, [listingParams.address, listingParams.state, listingParams.city, listingParams.zipcode, listingParams.price, (new Date()).toISOString().substring(0, 10), listingParams.bedroom, listingParams.bathroom, listingParams.pool, listingParams.ac, listingParams.heater, listingParams.floor, listingParams.parking, userID, listingParams.image, listingParams.thumbnail], cb);
}

exports.editListing = function(listingParams, cb) {
	var sql = "UPDATE listing SET ";
		sql += "address = ?, state = ?, city = ?, zipcode = ?, ";
		sql += "price = ?, posted_on = ?, bedroom_count = ?, bathroom_count = ?, ";
		sql += "pool = ?, ac = ?, heater = ?, floor_size = ?, ";
		sql += "parking = ? ";
		sql += "WHERE listing_id = ?";
	db.runqueryEscaped(sql, [listingParams.address, listingParams.state, listingParams.city, listingParams.zipcode, listingParams.price, (new Date()).toISOString().substring(0, 10), listingParams.bedroom, listingParams.bathroom, listingParams.pool, listingParams.ac, listingParams.heater, listingParams.floor, listingParams.parking, listingParams.listing_id], cb);
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
	var sql = "SELECT thumbnail, listing_id, address, city, state, zipcode, price, posted_on ";
		sql += "FROM listing ";
		sql += "WHERE listing.seller_id = ?";
		db.runqueryEscaped(sql,	[user.id], cb);
}

exports.getMessages = function(user, cb){
	if(user.type){
		var sql = "SELECT DISTINCT user.first_name, user.last_name, contacted_listing.listing_id, contacted_listing.message, contacted_listing.sent_date ";
			sql += "FROM user INNER JOIN contacted_listing ON user.user_id = contacted_listing.buyer_id ";
			sql += "WHERE user.user_type = 0 AND ";
			sql += "contacted_listing.listing_id IN ";
			sql += "(SELECT listing_id from listing WHERE listing.seller_id = ?)";
			db.runqueryEscaped(sql, [user.id], cb);
	}
	else{
		var sql = "SELECT t1.message, t1.sent_date, t1.listing_id, t2.first_name, t2.last_name ";
			sql += "from (SELECT user.user_id as buyer_id, contacted_listing.message, contacted_listing.sent_date, contacted_listing.listing_id ";
			sql += "FROM user inner join contacted_listing ";
			sql += "on user.user_id = contacted_listing.buyer_id) as t1 ";
			sql += "inner join ";
			sql += "(SELECT listing.listing_id, user.first_name, user.last_name from ";
			sql += "user inner join listing on user.user_id = listing.seller_id) as t2 ";
			sql += "on t1.listing_id = t2.listing_id ";
			sql += "where t1.buyer_id = ?";
		db.runqueryEscaped(sql, [user.id], cb);
	}	
}

/*
 * getContacts
 * Get the contacts involving the user with the specified id
 */
exports.getContacts = function(user, cb) {
	// to be implemented
}


