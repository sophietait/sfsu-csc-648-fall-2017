var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/', function(req, res, next) {
  res.render('browse/browse');
});

router.get('/city', function(req, res, next){
	listings.getListingsByCity(req.query.q, function(err, data) {
		if(err) {
			// add error handling for database errors

			// Set data to default test listings on database error(Used for testing without database)
			listings.getDefaultListings(function(data) {
				res.render('browse/city', { data: data });
			});

		}
		else {
			// Convert image blobs to base64 encoded strings(a format that HTML can display)
			for(var i = 0; i < data.length; i++) {
				if(data[i].image == null){
					continue;
				}
				var imgstr = new Buffer(data[i].image, 'binary').toString('base64');
				data[i].image = 'data:image/png;base64,' + imgstr;
			}
			// pass JSON data from search controller to search view
			res.render('browse/city', { data: data });
		}
	});
});
 
module.exports = router;
   
