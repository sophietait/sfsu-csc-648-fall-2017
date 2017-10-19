var db = require('../helpers/db');

/*
 *	db module is used by models to facilitate database operations.
 */

exports.getAllListings = function(cb) {
	var sql = 'SELECT listing_id, address FROM Listing';
	db.runquery(sql, cb); // Send query string and callback function
}

exports.getListingsByZip = function(q, cb) {
	var sql = 'SELECT * FROM Listings WHERE zip LIKE %' + q + '%';
	db.runquery(sql, cb);
}

exports.getListingsByAddress= function(q, cb) {
	var sql = 'SELECT * FROM Listings WHERE address LIKE %' + q + '%';
	db.runquery(sql, cb);
}
