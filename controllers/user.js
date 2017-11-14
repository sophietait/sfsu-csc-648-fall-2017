/*
 * Currently a basic skeleton to handle user/seller
 * login, sign up, dashboard features. More
 * functionality will be added. 
 */

var express = require('express');
var router = express.Router();

var auth = require('../middlewares/authentication');

var users = require('../models/Users');

/*
 * Render login page where existing user may login
 * (User has clicked on login link)
 */
router.get('/login', function(req, res, next) {
	res.render('user/login', { userData: req.session.user });
});

/*
 * POST request to user login(confirm user login)
 * Check that user credentials are correct
 * and redirect them to the appropriate page
 */
router.post('/login', auth.login, function(req, res, next) {
	if(req.session.user.id) {
		// user is now logged in
		res.redirect('back'); // to referer page
	}
	else {
		// user login error
		res.redirect('../home');
	}
});

/*
 * Logout user from this session
 */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) {
			// logout error
			res.redirect('../home');
		}
		else {
			// logout successful
			res.redirect('../home');
		}
	});
});

/*
 * GET request to signup page
 * Render signup page where user may signup/create an account
 * (User has clicked on the signup link)
 */
router.get('/signup', function(req, res, next) {
	res.render('user/signup');
});

/*
 * POST request to signup page
 * Check that the user does not already exist in the database
 * Create a new account for the user in the database
 * (User has submitted account information on signup page)
 */
router.post('/signup', auth.signup, function(err, req, res, next) {
	if(err) {
		// signup failed
		res.redirect('../home');
	}
	else {
		// signup success
		res.redirect('../home');
	}
});

/*
 * GET request to user dashboard
 * Check that the user is already logged in
 * (User clicks on dashboard link)
 */
router.get('/dashboard', function(req, res, next) {
	if(req.session.user.id) {
		// user is logged in
		/*
		user.getContacts(req.session.user.id, function(err, contactData) {
			// getContacts returns the appropriate contacts based on the user type
			if(err) {
				// database error
				res.redirect('../home');
			}
			else {
				res.render('user/dashboard', { userData: req.session.user, contactData: contactData });
			}
		});*/
		res.render('user/dashboard', { userData: req.session.user });
	}
	else {
		// user is not logged in
		res.redirect('../home');
	}
});

module.exports = router;

