var express = require('express');
var router = express.Router();

router.use('/about', require('./about'));
router.use('/search', require('./search'));
router.use('/listing', require('./listing'));
router.use('/user', require('./user'));

router.get('/', function(req, res, next) {
	res.render('home', {
		title: 'Dream Home'
	});
});

router.get('/home', function(req, res, next) {
	res.render('home', {
		title: 'Dream Home'
	});
});

module.exports = router;
