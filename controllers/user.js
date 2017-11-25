/*
 * Currently a basic skeleton to handle user/seller
 * login, sign up, dashboard features. More
 * functionality will be added. 
 */

var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

var auth = require('../middlewares/authentication');
const constants = require('../helpers/constants');

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
	res.render('user/signup', { userData: req.session.user });
});

/*
 * POST request to signup page
 * Check that the user does not already exist in the database
 * Create a new account for the user in the database
 * (User has submitted account information on signup page)
 */
router.post('/signup', auth.signup, function(req, res, next) {
	if(req.session.user.signup) {
		// signup success
		res.redirect('../home');
	}
	else {
		// signup failed
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

		// Add database call to get rows from contacted_listing table
		users.getSellerListings(req.session.user, function(err, data){
			if(err){
				res.redirect('../home');
			}
			else{
				// Convert image blobs to base64 encoded strings
				for(var i = 0; i < data.length; i++) {
					if(data[i].image == null){
						continue;
					}
					var imgstr = new Buffer(data[i].image, 'binary').toString('base64');
					data[i].image = 'data:image/png;base64,' + imgstr;
				}
				res.render('user/dashboard', { userData: req.session.user, data: data });
			}
		});
	}
	else {
		// user is not logged in
		res.redirect('../home');
	}
});

router.get('/addListingPage', function(req, res, next){
	if(req.session.user.id) {
		res.render('user/addListingPage', { userData: req.session.user });
	}
	else {
		// user is not logged in
		res.redirect('../home');
	}
});

router.post('/addListing', function(req, res, next){
	if(req.session.user.id){

		var form = new formidable.IncomingForm();
		form.uploadDir = __dirname + '/../public/uploads'; // temporary upload dir for images
		form.keepExtensions = true; // keep image file extensions

		// Parse addListing form with formidable
		form.parse(req, function(err, fields, files) {
			/*
			 * NOTE: files.image still returns a valid file object even when
			 * no file is selected. The file it writes to the files system 
			 * is 0 bytes. 
			 */

			// Read file and convert to binary buffer(blob)
			//fields.image = new Buffer(fs.readFileSync(files.image.path), 'binary');
			fields.image = fs.readFileSync(files.image.path);
				
			// pass form fields(including image blob) and user id to addListing function
			users.addListing(fields, req.session.user.id, function(err, data){
				if(err) {
					/*
					 * Database error not related to images.
					 * Continue to delete image but set error
					 * message/flag here to say that listing was not added
					 */
				}
				// delete image file from filesystem
				fs.unlink(files.image.path, function(err) {
					if(err) {
						// Error deleting file from filesystem
						res.redirect('../home');
					}
					else {
						// Image file deleted
						// Listing has been added to the database
						res.redirect('./dashboard');
					}
				});
			});
		});
	}
});

module.exports = router;

