var express = require('express');
var router = express.Router();

router.use('/about', require('./about'));
router.use('/search', require('./search'));
router.use('/listing', require('./listing'));
router.use('/user', require('./user'));

router.get('/', function(req, res, next) {
	res.redirect('./home');
});

router.get('/home', function(req, res, next) {
	/*
	 * Add database support for featured listings
	 */

	res.render('home', {
		title: 'Dream Home',
		userData: req.session.user
	});
});

module.exports = router;
