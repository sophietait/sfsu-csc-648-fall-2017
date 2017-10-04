var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about');
});

// Enter routes for teams about pages
router.get('/aboutJames', function(req, res, next) {
	res.render('aboutJames');
});
router.get('/aboutSupritha', function(req, res, next) {
	res.render('aboutSupritha');
});
router.get('/aboutSaengduean', function(req, res, next) {
	res.render('aboutSaengduean');
});
router.get('/aboutBravolly', function(req, res, next) {
	res.render('aboutBravolly');
});
router.get('/aboutSophie', function(req, res, next) {
	res.render('aboutSophie');
});
router.get('/aboutBrendan', function(req, res, next) {
	res.render('aboutBrendan');
});
router.get('/aboutSteve', function(req, res, next) {
	res.render('aboutSteve');
});

module.exports = router;
