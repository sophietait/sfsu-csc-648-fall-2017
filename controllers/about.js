var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about/about', { userData: req.session.user });
});

// Enter routes for each team member's about page
router.get('/aboutJames', function(req, res, next) {
	res.render('about/aboutJames');
});
router.get('/aboutSupritha', function(req, res, next) {
	res.render('about/aboutSupritha');
});
router.get('/aboutSaengduean', function(req, res, next) {
	res.render('about/aboutSaengduean');
});
router.get('/aboutBravolly', function(req, res, next) {
	res.render('about/aboutBravolly');
});
router.get('/aboutSophie', function(req, res, next) {
	res.render('about/aboutSophie');
});
router.get('/aboutBrendan', function(req, res, next) {
	res.render('about/aboutBrendan');
});
router.get('/aboutSteve', function(req, res, next) {
	res.render('about/aboutSteve');
});

module.exports = router;
