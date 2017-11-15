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
	var sql = "SELECT user_id, email, first_name, last_name, user_type ";
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
		sql += "VALUES(?, '', '', ?, ?, 0, 1)";
	db.runqueryEscaped(sql, [q.type, q.email, q.password], cb);
}

/*
 * getContacts
 * Get the contacts involving the user with the specified id
 */
exports.getContacts = function(user, cb) {
	// to be implemented
}


