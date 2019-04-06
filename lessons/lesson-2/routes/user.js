var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');



router.post('/signup',
    passport.authenticate('local.signup', {failureRedirect: '/user/signup'}),
    function (req, res) {
        res.redirect('/');
    });

router.get('/signup', function (req, res, next ) {
    res.render('user/signup');
});

router.post('/signin',
    passport.authenticate('local.signin',{failureRedirect:'/user/signup'}),
    function (req, res) {
        res.redirect('/');
    });

router.get('/signin', function (req, res, next ) {
    res.render('user/signin');
});

router.use('/', function(req, res, next){
    next();
});

module.exports = router;
