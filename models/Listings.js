/*
 *	db module is used by models to facilitate database operations.
 */
var db = require('../helpers/db');
const constants = require("../helpers/constants.js");

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
 * Uses image thumbnail
 */
exports.getListingsBySearch = function(search_text, cb) {
	var sql = "SELECT listing_id, thumbnail, bedroom_count, bathroom_count, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "WHERE ";
		sql += "LOWER(state) LIKE LOWER(?) OR ";
		sql += "zipcode LIKE ? OR ";
		sql += "LOWER(city) LIKE LOWER(?) OR ";
		sql += "LOWER(address) LIKE LOWER(?)";
		search_text = '%' + search_text + '%';
	db.runqueryEscaped(sql, [search_text, search_text, search_text, search_text], cb); // Send query string and callback function

}

/*
 * getListingsById
 * Get listings for the purpose of displaying the listing's detail page
 * Gets full image from database
 */
exports.getListingsById = function(id, cb) {
	var sql = "SELECT listing.image, listing.address, listing.city, listing.state, listing.zipcode, listing.price, listing.posted_on, listing.bedroom_count, listing.bathroom_count, listing.pool, listing.ac, listing.heater, listing.floor_size, listing.parking, listing.seller_id, user.first_name, user.last_name ";
		sql += "FROM listing, user ";
		sql += "WHERE ";
		sql += "listing.seller_id = user.user_id AND "
		sql += "listing.listing_id = ?";
	db.runqueryEscaped(sql, [id], cb);
}

exports.getListingsByCity = function(cb){
	var sql = "SELECT DISTINCT city ";
	    sql += "FROM listing ";
	db.runquery(sql, cb);    
}

exports.getListingsByState = function(cb){
	var sql = "SELECT DISTINCT state ";
	    sql += "FROM listing ";
	db.runquery(sql, cb);    
}

exports.getListingsByZipCode = function(cb){
	var sql = "SELECT DISTINCT zipcode ";
	    sql += "FROM listing ";
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

exports.sortByPriceBedBath = function(search_text, sortByPrice, bedroomValue, bathroomValue, cb){
	var sql = "SELECT listing_id, thumbnail, bedroom_count, bathroom_count, address, city, state, zipcode, price ";
	sql += "FROM listing ";
	sql += "WHERE ";
	sql += "(bedroom_count >= "+bedroomValue+" AND ";
	sql += "bathroom_count >= "+bathroomValue+") AND ";
	sql += "(LOWER(state) LIKE LOWER('%" + search_text + "%') OR ";
	sql += "zipcode LIKE '%" + search_text + "%' OR ";
	sql += "LOWER(city) LIKE LOWER('%" + search_text + "%') OR ";
	sql += "LOWER(address) LIKE LOWER('%" + search_text + "%')) ";
	if(sortByPrice==constants.SORT_PRICE_LOW_TO_HIGH){
		sql += "ORDER BY price";
	}
	else if (sortByPrice==constants.SORT_PRICE_HIGH_TO_LOW){
		sql += "ORDER BY price DESC";
	}
	db.runquery(sql, cb); // Send query string and callback function
}

exports.applyFilter = function(search_text,cb){

}

/*
 * getFeaturedListings
 * Get four listings to display as featured listings
 * Uses image thumbnail
 */
exports.getFeaturedListings = function(cb) {
	var sql = "SELECT listing_id, thumbnail, bedroom_count, bathroom_count, address, city, state, zipcode, price ";
		sql += "FROM listing ";
		sql += "ORDER BY price DESC ";
		sql += "LIMIT 4 ";
	db.runquery(sql, cb); // Send query string and callback function
}

/*
 * getListingByListingSeller
 * Used to verify that a specific Seller has listed a specific Listing.
 * No need to return actual listing details. 
 */
exports.getListingByListingSeller = function(SellerId, ListingId, cb) {
	var sql = "SELECT listing_id ";
		sql += "FROM listing ";
		sql += "WHERE seller_id = ? AND ";
		sql += "listing_id = ?";
	db.runqueryEscaped(sql, [SellerId, ListingId], cb);
}


