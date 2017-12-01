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
				if(data[i].thumbnail == null){
					continue;
				}
				var imgstr = new Buffer(data[i].thumbnail, 'binary').toString('base64');
				data[i].thumbnail = 'data:image/png;base64,' + imgstr;
			}
		}
		
		// Get featured listings
		listings.getFeaturedListings(function(err, featuredListings) {
			if(err) {
				featuredListings = []; // Set featuredListings on database error
			}
			else {
				// Convert image blobs to base64 encoded strings
				for(var i = 0; i < featuredListings.length; i++) {
					if(featuredListings[i].thumbnail == null) {
						continue;
					}
					var imgstr = new Buffer(listingData[i].thumbnail, 'binary').toString('base64');
					featuredListings[i].thumbnail = 'data:image/png;base64,' + imgstr;
				}
			}
			// pass JSON data from search controller to search view
			res.render('search/search', { 
				userData: req.session.user, 
				data: data, 
				featuredListings: featuredListings,
				pass_search_text: req.query.search_text, 
				pass_price_count: 0, 
				pass_bedroom_count: 0, 
				pass_bathroom_count: 0 
			});
		});
	});
});

router.get('/sortByPriceBedBath', function(req,res,next){
	listings.sortByPriceBedBath(req.query.search_text, req.query.sortByPrice, req.query.bedroomValue, req.query.bathroomValue, function(err,data){
		if(err){
			listings.getDefaultListings(function(data){
				res.render('search/search', { userData: req.session.user, data: data });
			});
		}
		else{
			for(var i=0; i<data.length;i++){
				if(data[i].thumbnail == null){
					continue;
				}
				var imgstr = new Buffer(data[i].thumbnail, 'binary').toString('base64');
				data[i].thumbnail = 'data:image/png;base64,' + imgstr;
			}
			res.render('partials/searchResults.ejs', {layout: true, data: data});
		}
	})
});

module.exports = router;
