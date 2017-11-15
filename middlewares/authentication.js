
/*
 * Middleware to provide user authentication for logging in and signing up
 */

var crypto = require('crypto');

var user = require('../models/Users');

exports.login = function(req, res, next) {
	// hash password
	var hash = crypto.createHash('sha256');
	hash.update(req.body.pwd + req.body.email);
	var hashedpwd = hash.digest('base64');

	user.getUserByLogin({ 'email': req.body.email, 'password': hashedpwd }, function(err, userData) {
		if(err) {
			// database error
			next();
		}
		else {
			if(typeof userData !== 'undefined' && userData.length > 0) {
				// login success

				// Set session details
				/*
				* 0 - registered user
				* 1 - seller
				*/
				req.session.user = {
					id: userData[0].user_id,
					first_name: userData[0].first_name,
					last_name: userData[0].last_name,
					email: userData[0].email,
					phone: userData[0].phone,
					type: userData[0].user_type
				}
				next();
			}
			else {
				// login failed
				next();
			}
		}
	});
};

exports.signup = function(req, res, next) {
	// hash password
	var hash = crypto.createHash('sha256');
	hash.update(req.body.pwd + req.body.email);
	var hashedpwd = hash.digest('base64');

	user.getUsersByEmail(req.body.email, function(err, userData) {
		if(err) {
			// database error
			req.session.user.signup = false;
			next();
		}
		else {
			if(typeof userData === 'undefined' || userData.length <= 0) {
				// no other user with these credentials, attempt to add to database
				// Type is set to seller at the moment
				user.addNewUser({ 'type': 1, 'email': req.body.email, 'password': hashedpwd }, function(err) {
					if(err) {
						// database error
						req.session.user.signup = false;
					}
					else {
						// user successfully created
						req.session.user.signup = true;
						next();
					}
				});
			}
			else {
				// user already exists. Do not call next
				res.redirect('back');
			}
		}
	});
}

