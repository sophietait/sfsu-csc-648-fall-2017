
/*
 * Middleware to provide user authentication for logging in and signing up
 */

var crypto = require('crypto');

var user = require('../models/Users');
const constants = require('../helpers/constants');

exports.login = function(req, res, next) {
	// hash password
	var hash = crypto.createHash('sha256');
	hash.update(req.body.password + req.body.email);
	var hashedpassword = hash.digest('base64');

	user.getUserByLogin({ 'email': req.body.email, 'password': hashedpassword }, function(err, userData) {
		if(err) {
			// database error
			next();
		}
		else {
			if(typeof userData !== 'undefined' && userData.length > 0) {
				// login success

				// Set session details
				req.session.user = {
					id: userData[0].user_id,
					first_name: userData[0].first_name,
					last_name: userData[0].last_name,
					email: userData[0].email,
					phone: userData[0].phone,
					type: userData[0].user_type
				};
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
	hash.update(req.body.password + req.body.email);
	var hashedpassword = hash.digest('base64');

	user.getUsersByEmail(req.body.email, function(err, userData) {
		if(err) {
			// database error
			req.session.user.signup = false;
			next();
		}
		else {
			if(typeof userData === 'undefined' || userData.length <= 0) {
				// no other user with these credentials, attempt to add to database

				// Type is set in the referring user controller: sellersignup or signup
				user.addNewUser({ 'type': req.body.userType,'first_name': req.body.firstName,'last_name': req.body.lastName, 'email': req.body.email, 'password': hashedpassword }, function(err) {
					if(err) {
						// database error
						req.session.user.signup = false;
						next();
					}
					else {
						// user successfully created
						req.session.user.signup = true;
						req.session.user.signupType = req.body.userType;
						next();
					}
				});
			}
			else {
				// user already exists. 
				req.session.user.signup = false;
				next();
			}
		}
	});
}

