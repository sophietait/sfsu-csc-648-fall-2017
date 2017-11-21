var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about/about', { userData: req.session.user });
});

// Enter routes for each team member's about page
router.get('/aboutJames', function(req, res, next) {
	res.render('about/aboutJames', { userData: req.session.user });
});
router.get('/aboutSupritha', function(req, res, next) {
	res.render('about/aboutSupritha', { userData: req.session.user });
});
router.get('/aboutSaengduean', function(req, res, next) {
	res.render('about/aboutSaengduean', { userData: req.session.user });
});
router.get('/aboutBravolly', function(req, res, next) {
	res.render('about/aboutBravolly', { userData: req.session.user });
});
router.get('/aboutSophie', function(req, res, next) {
	res.render('about/aboutSophie', { userData: req.session.user });
});
router.get('/aboutBrendan', function(req, res, next) {
	res.render('about/aboutBrendan', { userData: req.session.user });
});
router.get('/aboutSteve', function(req, res, next) {
	res.render('about/aboutSteve', { userData: req.session.user });
});

module.exports = router;
