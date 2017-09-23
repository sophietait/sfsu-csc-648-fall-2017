var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about');
});

// Enter routes for teams about pages
router.get('/aboutJames', function(req, res, next) {
	res.render('aboutJames');
});


module.exports = router;
