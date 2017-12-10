var express = require('express');
var router = express.Router();

var users = require('../models/Users');
var contactedListings = require('../models/ContactedListings');

router.post('/contactSeller', function(req, res, next) {
	if(req.session.user.id) {
		// user is logged in
        contactedListings.sendMessage(req.session.user.id, req.body.message, req.body.listingID, function(err, data){
			if(err) {
				// database error

				// Could be caused by user sending a message to the same listing twice.
			}
			res.redirect('../user/dashboard');
		});
	}
	else {
		// user is not logged in
		// redirect to the signup page
		res.redirect('../user/signup');
	}
});

module.exports = router;
