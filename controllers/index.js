var express = require('express');
var router = express.Router();

var listing = require('../models/Listings');

router.use('/about', require('./about'));
router.use('/search', require('./search'));
router.use('/listing', require('./listing'));
router.use('/browse', require('./browse'));
router.use('/user', require('./user'));

router.get('/', function(req, res, next) {
	res.redirect('./home');
});

router.get('/home', function(req, res, next) {
	// Get featured listings from database
	listing.getFeaturedListings(function(err, listingData) {
		if(err) {
			// database error
			listingData = []; // set listingData to empty array on database error
		}
		else {
			// convert image blobs to base64 encoded strings
			for(var i = 0; i < listingData.length; i++) {
				if(listingData[i].thumbnail == null) {
					continue;
				}
				var imgstr = new Buffer(listingData[i].thumbnail, 'binary').toString('base64');
				listingData[i].thumbnail = 'data:image/png;base64,' + imgstr;
			}
		}
		res.render('home', {
			title: 'Dream Home',
			userData: req.session.user,
			featuredListings: listingData,
			pass_search_text: ""
		});
	});
});

module.exports = router;
