var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/', function(req, res, next) {
	// Get all listings from the Listings model
	listings.getAllListings(function(err, data) {
		// check for errors
		
		// pass JSON data from search controller to search view
		// NOTE: search term is in req.query.q
		res.render('search/search', { data: data });
	});
});

module.exports = router;
