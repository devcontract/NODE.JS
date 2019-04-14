var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var flash = require('connect-flash');


router.post('/signup',
    passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        successRedirect: '/user/signin',
        session: false,
        failureFlash: true
    }));


router.get('/signup', function (req, res, next ) {

    var messages = req.flash('error');

    res.render('user/signup',{
        flash_error:messages,
        hasErrors: messages.length > 0});
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
    res.render('user/signin',{
        flash_error:messages,
        hasErrors: messages.length > 0,
        isSuccess: success.length > 0,
        flash_success: success});
});

router.get('/profile', isLoggedIn ,function(req,res,next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn ,function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/' , function(req, res, next){
    next();
});


module.exports = router;


function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}