var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/', function(req, res, next) {
	// Get listings based on search 
	listings.getListingsBySearch(req.query.search_text, function(err, data) {
		if(err) {
			data = []; // Set data to empty list on database error
		}
		else {
			// Convert image blobs to base64 encoded strings
			for(var i = 0; i < data.length; i++) {
				if(data[i].image == null){
					continue;
				}
				var imgstr = new Buffer(data[i].image, 'binary').toString('base64');
				data[i].image = 'data:image/png;base64,' + imgstr;
			}
		}
		// pass JSON data from search controller to search view
		res.render('search/search', { data: data, pass_search_text: req.query.search_text });
	});
});

router.get('/sortByPriceHighToLow', function(req, res, next) {
	listings.sortByPriceHighToLow(req.query.search_text, function(err, data) {
		if(err) {
			// add error handling for database errors
			// Set data to default test listings on database error(Used for testing without database)
			listings.getDefaultListings(function(data) {
				res.render('search/search', { data: data });
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
			res.render('partials/searchResults.ejs', {layout: true, data: data});
		}
	});
});

router.get('/sortByPriceLowToHigh', function(req, res, next) {
	listings.sortByPriceLowToHigh(req.query.search_text, function(err, data) {
		if(err) {
			// add error handling for database errors
			// Set data to default test listings on database error(Used for testing without database)
			listings.getDefaultListings(function(data) {
				res.render('search/search', { data: data });
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
			res.render('partials/searchResults.ejs', {layout: true, data: data});
		}
	});
});

module.exports = router;
