var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about');
});

// Enter routes for teams about pages


module.exports = router;
