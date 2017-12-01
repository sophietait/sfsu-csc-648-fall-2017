/*
 * Currently a basic skeleton to handle user/seller
 * login, sign up, dashboard features. More
 * functionality will be added. 
 */

var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var thumb = require('node-thumbnail').thumb;
var router = express.Router();

var auth = require('../middlewares/authentication');
const constants = require('../helpers/constants');

var users = require('../models/Users');
var listings = require('../models/Listings');

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
					if(data[i].thumbnail == null){
						continue;
					}
					var imgstr = new Buffer(data[i].thumbnail, 'binary').toString('base64');
					data[i].thumbnail = 'data:image/png;base64,' + imgstr;
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

		var form = new formidable.IncomingForm(); // Get form data from addListing page
		form.uploadDir = __dirname + '/../public/uploads'; // temporary upload dir for images
		form.keepExtensions = true; // keep image file extensions

		// Parse addListing form with formidable
		form.parse(req, function(err, fields, files) {
			if(err) {
				//form parse error
				res.redirect('../home');
			}
			/*
			 * NOTE: files.image still returns a valid file object even when
			 * no file is selected. The file it writes to the files system 
			 * is 0 bytes. 
			 */

			// Read image file and convert to binary buffer(blob)
			fields.image = fs.readFileSync(files.image.path);

			// Generate thumbnail
			thumb({
				source: files.image.path,
				destination: __dirname + '/../public/uploads', // temporary dir for thumbnail
				width: 200, // image thumnail width
				quiet: true
			}, function(imgfiles, err, stdout, stderr) {
				if(err) {
					// Set thumbnail to null on error
					fields.thumbnail = null;
				}
				else {
					// Read image file and convert to binary buffer(blob)
					fields.thumbnail = fs.readFileSync(imgfiles[0].dstPath);
				}

				// pass form fields(including image/thumbnail blob) and user id to addListing function
				users.addListing(fields, req.session.user.id, function(err, data){
					if(err) {
						/*
						 * Database error not related to images.
						 * Continue to delete image but set error
						 * message/flag here to say that listing was not added
						 */
					}

					// Delete image and thumbnail asynchronously
					fs.unlink(files.image.path, function(err) {
						if(err) console.log(err);
					});
					fs.unlink(imgfiles[0].dstPath, function(err) {
						if(err) console.log(err);
					});

					// Redirect to dashboard
					res.redirect('./dashboard');
				});
			});
		});
	}
});

router.get('/deleteListing/:id(\\d+)', function(req, res, next) {
	if(req.session.user.id && (req.session.user.type == constants.SELLER)) {
		// user is logged in and is a seller
		
		// Check that the listing_id was posted by this seller
		listings.getListingByListingSeller(req.session.user.id, req.params.id, function(err, data) {
			if(err) {
				// database error
				res.redirect('../../home');
			}
			else {
				// check that the listing does exist
				if(typeof data === 'undefined' || data.length <= 0) {
					// no listing with specified seller_id and listing_id exists
					next(); // stop handling request(send to 404 error since listing does not exist)
				}
				else {
					// delete the listing
					users.deleteListing(req.params.id, function(err, data) {
						if(err) {
							// database error
							res.redirect('../../home');
						}
						else {
							// listing has been successfully deleted
							res.redirect('../dashboard'); // redirect to dashboard
						}
					});
				}
			}
		});
	}
});

module.exports = router;

