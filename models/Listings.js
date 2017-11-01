/*
 *	db module is used by models to facilitate database operations.
 */
var db = require('../helpers/db');

/*
 * getAllListings
 * Get every listings from the database. 
 */
exports.getAllListings = function(cb) {
	var sql = "SELECT listing_id, address, city, state, zipcode, price "
		sql += "FROM listing";
	db.runquery(sql, cb); // Send query string and callback function
}

/*
 * getListingsBySearch
 * Get listings that are LIKE the user's search. 
 */
exports.getListingsBySearch = function(q, cb) {
	var sql = "SELECT listing_id, image, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "WHERE ";
		sql += "LOWER(state) LIKE LOWER('%" + q + "%') OR ";
		sql += "zipcode LIKE '%" + q + "%' OR ";
		sql += "LOWER(city) LIKE LOWER('%" + q + "%') OR ";
		sql += "LOWER(address) LIKE LOWER('%" + q + "%')";
	db.runquery(sql, cb); // Send query string and callback function
}

exports.getListingsById = function(id, cb) {
	var sql = "SELECT image, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "WHERE ";
		sql += "listing_id = " + id;
	db.runquery(sql, cb);
}

/*
 * getDefaultListings
 * returns hardcoded json data of listings to use when testing without a database. 
 */
exports.getDefaultListings = function(cb) {
	var data = [];
	var defaultListings = require('./test_data/defaultListings.json');
	for(var i = 0; i < defaultListings.listings.length; i++)
		data[i] = defaultListings.listings[i];
	cb(data);
}

