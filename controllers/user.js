var express = require('express');
var router = express.Router();

var users = require('../models/Users');

/*
 * Render login page where user may login
 */
router.get('/login', function(req, res, next) {
});

/*
 * Logout user from this session
 */
router.get('/logout', function(req, res, next) {
});

/*
 * Render signup page where user may signup/create an account
 */
router.get('/signup', function(req, res, next) {
});

/*
 * Confirm user signup.
 * Check that the user does not already exist in the database
 * Create a new account for the user in the database
 */
router.post('/signup/confirm', function(req, res, next) {
});

/*
 * GET request to user dashboard
 * Check that the user is already logged in
 */
router.get('/dashboard', function(req, res, next) {
});

/*
 *
 */
router.post('/dashboard', function(req, res, next) {
});

module.exports = router;

