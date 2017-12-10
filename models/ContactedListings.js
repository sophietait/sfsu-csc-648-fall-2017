var db = require('../helpers/db');

exports.sendMessage = function(userId, message, listingId, cb) {
	var current_date = new Date();
	var sql = "INSERT into contacted_listing (buyer_id, listing_id, message, sent_date) ";
		sql += "VALUES(?, ?, ?, ?)";
	db.runqueryEscaped(sql, [userId, parseInt(listingId), message, current_date], cb);
}
