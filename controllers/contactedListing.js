var express = require('express');
var router = express.Router();

var users = require('../models/Users');
var contactedListings = require('../models/ContactedListings');

router.post('/contactSeller', function(req, res, next) {
	if(req.session.user.id) {
        contactedListings.sendMessage(req.session.user.id, req.body.message, req.body.listingID, function(err, data){
			if(err){
				res.redirect('../home');
			}
			users.getMessages(req.session.user.id, function(err, messages){
				res.render('user/dashboard', { title: 'Dream Home', userData: req.session.user, data: data, messages: messages });
			});	
		});
	}
	else {
		res.redirect('../home');
	}
});

module.exports = router;