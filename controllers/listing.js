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
				res.render('listing/listing', { listingData: listingData[0], addressString: addressString });	
			});
			
			//next(); // Stop handling request
		}
		else {
			// Create address string used for google maps
			var addressString = '';
			if(typeof listingData !== 'undefined' && listingData.length > 0) {
				addressString = listingData[0].address + ', ' + listingData[0].city + ' ' + 
								listingData[0].zipcode + ' ' + listingData[0].state;
			}
			// Render listing page for the appropriate listing_id, passing the listing object and address string
    		res.render('listing/listing', { listingData: listingData[0], addressString: addressString });
		}
	});
});

module.exports = router;

