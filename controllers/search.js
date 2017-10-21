var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/', function(req, res, next) {
	// Get listings based on search 
	listings.getListingsBySearch(req.query.q, function(err, data) {
		if(err) {
			data = []; // Set data to empty list on database error
		}
		// pass JSON data from search controller to search view
		res.render('search/search', { data: data });
	});
});

module.exports = router;
