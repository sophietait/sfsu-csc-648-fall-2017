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
exports.getListingsBySearch = function(search_text, cb) {
	var sql = "SELECT listing_id, image, bedroom_count, bathroom_count, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "WHERE ";
		sql += "LOWER(state) LIKE LOWER(?) OR ";
		sql += "zipcode LIKE ? OR ";
		sql += "LOWER(city) LIKE LOWER(?) OR ";
		sql += "LOWER(address) LIKE LOWER(?)";
		search_text = '%' + search_text + '%';
	db.runqueryEscaped(sql, [search_text, search_text, search_text, search_text], cb); // Send query string and callback function

}

exports.getListingsById = function(id, cb) {
	var sql = "SELECT image, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "WHERE ";
		sql += "listing_id = ?";
	db.runqueryEscaped(sql, [id], cb);
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

exports.sortByPriceBedBath = function(search_text, sortByPrice, bedroomValue, bathroomValue, cb){
	var sql = "SELECT listing_id, image, bedroom_count, bathroom_count, address, city, state, zipcode, price ";
	sql += "FROM listing ";
	sql += "WHERE ";
	sql += "(bedroom_count >= "+bedroomValue+" AND ";
	sql += "bathroom_count >= "+bathroomValue+") AND ";
	sql += "(LOWER(state) LIKE LOWER('%" + search_text + "%') OR ";
	sql += "zipcode LIKE '%" + search_text + "%' OR ";
	sql += "LOWER(city) LIKE LOWER('%" + search_text + "%') OR ";
	sql += "LOWER(address) LIKE LOWER('%" + search_text + "%')) ";
	if(sortByPrice==1){
		sql += "ORDER BY price";
	}
	else if (sortByPrice==2){
		sql += "ORDER BY price DESC";
	}
	db.runquery(sql, cb); // Send query string and callback function
}

exports.applyFilter = function(search_text,cb){

}

