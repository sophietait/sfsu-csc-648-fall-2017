var db = require('../helpers/db');

/*
 *	db module is used by models to facilitate database operations.
 */

// Get all listings
exports.getAllListings = function(cb) {
	var sql = 'SELECT listing_id, address, city, state, pincode, price FROM listing';
	db.runquery(sql, cb); // Send query string and callback function
}

// Add other listing database functions

