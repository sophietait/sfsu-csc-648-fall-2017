var express = require('express');
var router = express.Router();

var listings = require('../models/Listings');

router.get('/', function(req, res, next) {
  res.render('browse/browse');
});

router.get('/city', function(req, res, next){
	listings.getListingsByCity(function(err, data) {
		if(err){
			//database error
			res.redirect('./home');
		}
		else{
			for(var i =0 ; i < data.length; i++){
				data[i] = data[i].city;
			}
			    res.render('browse/result' , {data: data});
		}
		
	});
});

router.get('/state', function(req, res, next){
	listings.getListingsByState(function(err, data) {
		if(err){
			//database error
			res.redirect('./home');
		}
		else{
			for(var i =0 ; i < data.length; i++){
				data[i] = data[i].state;
			}
			res.render('browse/result' , {data: data});
		}
	});
});

router.get('/zipcode', function(req, res, next){
	listings.getListingsByZipCode(function(err, data) {
		if(err){
			//database error
			res.redirect('./home');
		}
		else{
			for(var i = 0; i < data.length; i++){
				data[i] = data[i].zipcode;
			}
			res.render('browse/result' , {data: data});
		}
	});
});


 

module.exports = router;
   
