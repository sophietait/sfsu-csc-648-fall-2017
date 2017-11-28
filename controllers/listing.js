var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/:id(\\d+)', function(req, res, next) {
	/* Check listing table in database if id is a valid listing_id
	 * If it is valid, populate listingData with the appropriate row from the listing table
 	 * else display 404 error
	 */
	listings.getListingsById(req.params.id, function(err, listingData) {
		if(err) {
			// add error handling for database errors
			
			// Set listingData to default test listings on database error(used for testing without database)
			listings.getDefaultListings(function(listingData) {
				var addressString = '';
				if(typeof listingData !== 'undefined' && listingData.length > 0) {
					addressString = listingData[0].address + ', ' + listingData[0].city + ' ' + 
									listingData[0].zipcode + ' ' + listingData[0].state;
				}
				// Convert image blob to base64 encoded string
				if(listingData[0].image){
					var imgstr = new Buffer(listingData[0].image, 'binary').toString('base64');
					listingData[0].image = 'data:image/png;base64,' + imgstr;
				}
				res.render('listing/listing', { 
					title: 'Dream Home',
					userData: req.session.user,
					listingData: listingData[0],
					addressString: addressString,
					pass_search_text: req.query.search_text || ""
				});	
			});

		}
		else {
			// Create address string used for google maps
			var addressString = '';
			if(typeof listingData !== 'undefined' && listingData.length > 0) {
				addressString = listingData[0].address + ', ' + listingData[0].city + ' ' + 
								listingData[0].zipcode + ' ' + listingData[0].state;
				// Render listing page for the appropriate listing_id, passing the listing object and address string

				// Convert image blob to base64 encoded string
				if(listingData[0].image){
					var imgstr = new Buffer(listingData[0].image, 'binary').toString('base64');
					listingData[0].image = 'data:image/png;base64,' + imgstr;
				}
				res.render('listing/listing', { 
					userData: req.session.user, 
					listingData: listingData[0], 
					addressString: addressString,
					pass_search_text: req.query.search_text || ""
				});
			}
			else {
				next(); // stop handling request for invalid listing
			}
		}
	});
});

/*
 * POST request to specific listing page
 * User is trying to contact the seller
 * If user is logged in: send message to listing seller
 * Else prompt the user to log in or register
 */
router.post('/:id(\\d+)', function(req, res, next) {
	res.redirect('back'); // temporary; do nothing
});

module.exports = router;

