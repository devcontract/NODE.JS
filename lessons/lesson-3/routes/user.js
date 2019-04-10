var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var flash = require('connect-flash');


router.post('/signup',
    passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        successRedirect: '/user/signin',
        failureFlash: true
    }));


router.get('/signup', function (req, res, next ) {
    var messages = req.flash('error');

    res.render('user/signup',{messages:messages, hasErrors: messages.length > 0});
});

router.post('/signin',
    passport.authenticate('local.signin',{
        failureRedirect:'/user/signin',
        successRedirect:'/user/profile',
        failureFlash: true
    }));

router.get('/signin', function (req, res, next ) {
    var messages = req.flash('error');
    var success = req.flash('success');
    res.render('user/signin',{messages:messages, hasErrors: messages.length > 0, isSuccess: success.length > 0, success: success});
});

router.get('/profile',function(req,res,next) {
    res.render('user/profile');
});

router.use('/', function(req, res, next){
    next();
});


module.exports = router;
